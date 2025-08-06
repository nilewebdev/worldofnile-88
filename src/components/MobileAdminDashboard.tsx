import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Settings, Mail, Phone, Clock, DollarSign, FileText, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useMobile } from "@/hooks/use-mobile-detect";

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

interface MobileAdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  user: SupabaseUser | null;
}

const MobileAdminDashboard = ({ isOpen, onClose, user }: MobileAdminDashboardProps) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const { toast } = useToast();
  const isMobile = useMobile();

  useEffect(() => {
    if (isOpen) {
      fetchAllBookings();
    }
  }, [isOpen]);

  const fetchAllBookings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
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

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;

      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      ));

      toast({
        title: "Status updated",
        description: `Booking status changed to ${status}`,
      });
    } catch (error: any) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const sendResponse = async () => {
    if (!selectedBooking || !responseMessage.trim()) return;

    try {
      toast({
        title: "Response sent",
        description: `Email sent to ${selectedBooking.email}`,
      });
      
      setResponseMessage("");
      setSelectedBooking(null);
    } catch (error: any) {
      toast({
        title: "Error sending response",
        description: error.message,
        variant: "destructive",
      });
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

  if (!isMobile) {
    // Return regular admin dashboard for desktop
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Admin Dashboard - Bookings Management
              <Button
                variant="outline"
                size="sm"
                onClick={fetchAllBookings}
                disabled={isLoading}
                className="ml-auto"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{bookings.length}</div>
                    <div className="text-sm text-muted-foreground">Total Bookings</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-500">
                      {bookings.filter(b => !b.status || b.status === 'pending').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Pending</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {bookings.filter(b => b.status === 'confirmed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Confirmed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-500">
                      {bookings.filter(b => b.status === 'completed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </CardContent>
                </Card>
              </div>

              {/* Bookings List */}
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>{booking.service}</span>
                          <Badge 
                            variant="secondary" 
                            className={`${getStatusColor(booking.status)} text-white`}
                          >
                            {booking.status || 'Pending'}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Select
                            value={booking.status || 'pending'}
                            onValueChange={(value) => updateBookingStatus(booking.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Respond
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium">Client:</span>
                            <span>{booking.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(booking.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {booking.budget_range && (
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span>{booking.budget_range}</span>
                            </div>
                          )}
                          {booking.timeline && (
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{booking.timeline}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {booking.project_details && (
                        <div className="pt-2 border-t mt-4">
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
            </div>
          )}

          {/* Response Modal */}
          {selectedBooking && (
            <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Respond to {selectedBooking.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">To:</label>
                    <Input value={selectedBooking.email} disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subject:</label>
                    <Input value={`Re: ${selectedBooking.service} Project`} disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message:</label>
                    <Textarea
                      placeholder="Write your response here..."
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      rows={6}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                      Cancel
                    </Button>
                    <Button onClick={sendResponse}>
                      Send Response
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile-optimized version
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-full max-w-none max-h-none m-0 rounded-none p-0">
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="glass border-b border-border/50 p-4">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Admin Dashboard
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchAllBookings}
                    disabled={isLoading}
                    className="mobile-button"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClose}
                    className="mobile-button"
                  >
                    ✕
                  </Button>
                </div>
              </DialogTitle>
            </DialogHeader>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Mobile Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="glass">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-primary">{bookings.length}</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </CardContent>
                  </Card>
                  <Card className="glass">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-yellow-500">
                        {bookings.filter(b => !b.status || b.status === 'pending').length}
                      </div>
                      <div className="text-xs text-muted-foreground">Pending</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Mobile Bookings List */}
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <Card key={booking.id} className="glass">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-sm">{booking.service}</h3>
                            <p className="text-xs text-muted-foreground">{booking.name}</p>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`${getStatusColor(booking.status)} text-white text-xs`}
                          >
                            {booking.status || 'Pending'}
                          </Badge>
                        </div>

                        <div className="flex gap-2 mb-3">
                          <Select
                            value={booking.status || 'pending'}
                            onValueChange={(value) => updateBookingStatus(booking.id, value)}
                          >
                            <SelectTrigger className="mobile-button">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            onClick={() => setSelectedBooking(booking)}
                            className="mobile-button"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          onClick={() => setExpandedBooking(expandedBooking === booking.id ? null : booking.id)}
                          className="w-full mobile-button flex items-center justify-between"
                        >
                          <span>View Details</span>
                          {expandedBooking === booking.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>

                        {expandedBooking === booking.id && (
                          <div className="mt-3 pt-3 border-t border-border/50 space-y-2 text-sm animate-fade-in">
                            <div><span className="font-medium">Email:</span> {booking.email}</div>
                            <div><span className="font-medium">Date:</span> {new Date(booking.created_at).toLocaleDateString()}</div>
                            {booking.budget_range && <div><span className="font-medium">Budget:</span> {booking.budget_range}</div>}
                            {booking.timeline && <div><span className="font-medium">Timeline:</span> {booking.timeline}</div>}
                            {booking.project_details && (
                              <div>
                                <span className="font-medium">Details:</span>
                                <p className="mt-1 text-muted-foreground">{booking.project_details}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Response Modal */}
        {selectedBooking && (
          <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
            <DialogContent className="w-full h-full max-w-none max-h-none m-0 rounded-none">
              <div className="flex flex-col h-full">
                <DialogHeader className="glass border-b p-4">
                  <DialogTitle>Respond to {selectedBooking.name}</DialogTitle>
                </DialogHeader>
                <div className="flex-1 p-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium">To:</label>
                    <Input value={selectedBooking.email} disabled className="mobile-button" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subject:</label>
                    <Input value={`Re: ${selectedBooking.service} Project`} disabled className="mobile-button" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium">Message:</label>
                    <Textarea
                      placeholder="Write your response here..."
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      className="min-h-32 mt-2"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedBooking(null)}
                      className="flex-1 mobile-button-large"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={sendResponse}
                      className="flex-1 mobile-button-large"
                    >
                      Send Response
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MobileAdminDashboard;
