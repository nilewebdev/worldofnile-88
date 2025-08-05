import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Calendar, DollarSign, Clock, FileText, Mail, User as UserIcon } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  project_details: string | null;
  budget_range: string | null;
  timeline: string | null;
  status: string | null;
  created_at: string;
}

interface BookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: SupabaseUser | null;
}

const BookingsModal = ({ isOpen, onClose, user }: BookingsModalProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user && isOpen) {
      fetchBookings();
    }
  }, [user, isOpen]);

  const fetchBookings = async () => {
    if (!user?.email) return;
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading bookings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            My Bookings
          </DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : bookings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
              <p className="text-muted-foreground">
                You haven't made any bookings yet. Start a project with us to see your bookings here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5" />
                      {booking.service}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${getStatusColor(booking.status)} text-white`}
                    >
                      {booking.status || 'Pending'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Name:</span>
                        <span>{booking.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Email:</span>
                        <span>{booking.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Submitted:</span>
                        <span>{new Date(booking.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {booking.budget_range && (
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Budget:</span>
                          <span>{booking.budget_range}</span>
                        </div>
                      )}
                      {booking.timeline && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Timeline:</span>
                          <span>{booking.timeline}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {booking.project_details && (
                    <div className="pt-2 border-t">
                      <div className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <span className="font-medium">Project Details:</span>
                          <p className="mt-1 text-muted-foreground">{booking.project_details}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingsModal;