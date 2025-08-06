import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  status: string | null;
  created_at: string;
}

interface BookingsBarProps {
  user: SupabaseUser | null;
  onBookingsClick: () => void;
}

const BookingsBar = ({ user, onBookingsClick }: BookingsBarProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    if (!user?.email) return;
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'text-green-400 bg-green-400/10';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'completed':
        return 'text-blue-400 bg-blue-400/10';
      case 'cancelled':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  if (!user || bookings.length === 0) {
    return null;
  }

  return (
    <div className="w-full glass border-b border-border/50 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  My Bookings ({bookings.length})
                </h3>
                <p className="text-xs text-muted-foreground">
                  Recent project requests
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onBookingsClick}
                className="hidden sm:flex"
              >
                View All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="sm:hidden"
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Expanded View */}
          {isExpanded && (
            <div className="mt-3 space-y-2 sm:hidden animate-fade-in">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">{booking.service}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status || 'Pending'}
                  </span>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={onBookingsClick}
                className="w-full"
              >
                View All Bookings
              </Button>
            </div>
          )}

          {/* Desktop Quick View */}
          <div className="hidden sm:block mt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div>
                    <div className="text-sm font-medium text-foreground">{booking.service}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status || 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsBar;