import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Star, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface FeedbackFormProps {
  doctorId: number;
  doctorName: string;
  onClose: () => void;
}

const FeedbackForm = ({ doctorId, doctorName, onClose }: FeedbackFormProps) => {
  const [formData, setFormData] = useState({
    patientName: "",
    rating: 0,
    comment: "",
    categories: {
      knowledge: 5,
      communication: 5,
      waitTime: 5,
      cleanliness: 5,
      staffBehavior: 5,
      valueForMoney: 5
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleCategoryChange = (category: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store feedback in localStorage (in a real app, this would be sent to a server)
      const feedback = {
        id: Date.now(),
        doctorId,
        patientName: formData.patientName,
        rating: formData.rating,
        comment: formData.comment,
        categories: formData.categories,
        date: new Date().toISOString(),
        verified: true
      };

      const existingFeedback = JSON.parse(localStorage.getItem('patientFeedback') || '[]');
      existingFeedback.push(feedback);
      localStorage.setItem('patientFeedback', JSON.stringify(existingFeedback));

      setIsSubmitted(true);
      toast.success("Thank you for your feedback!");
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle className="w-16 h-16 text-primary mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Feedback Submitted Successfully!
          </h3>
          <p className="text-muted-foreground text-center">
            Thank you for taking the time to share your experience with Dr. {doctorName}.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Share Your Experience</CardTitle>
        <CardDescription className="text-muted-foreground">
          Help other patients by sharing your feedback about Dr. {doctorName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Name */}
          <div className="space-y-2">
            <Label htmlFor="patientName">Your Name *</Label>
            <Input
              id="patientName"
              placeholder="Enter your name"
              value={formData.patientName}
              onChange={(e) => setFormData(prev => ({ ...prev, patientName: e.target.value }))}
              required
            />
          </div>

          {/* Overall Rating */}
          <div className="space-y-3">
            <Label>Overall Rating *</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= formData.rating
                        ? 'fill-accent text-accent'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'Select rating'}
              </span>
            </div>
          </div>

          {/* Category Ratings */}
          <div className="space-y-4">
            <Label>Rate Specific Aspects</Label>
            <div className="space-y-3">
              {Object.entries(formData.categories).map(([category, rating]) => (
                <div key={category} className="flex items-center justify-between">
                  <Label className="text-sm capitalize">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleCategoryChange(category, star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= rating
                              ? 'fill-accent text-accent'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review *</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience with this doctor..."
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              rows={4}
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || formData.rating === 0 || !formData.patientName || !formData.comment}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
