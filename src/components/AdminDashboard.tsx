import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Eye, EyeOff, Users, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  project_details: string | null;
  budget_range: string | null;
  timeline: string | null;
  created_at: string;
}

const AdminDashboard = () => {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
    
    // Set up real-time subscriptions
    const contactsSubscription = supabase
      .channel('contact_messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'contact_messages' },
        (payload) => {
          setContacts(prev => [payload.new as ContactMessage, ...prev]);
          toast({
            title: "New Contact Message!",
            description: `From ${(payload.new as ContactMessage).name}`,
          });
        }
      )
      .subscribe();

    const bookingsSubscription = supabase
      .channel('bookings')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bookings' },
        (payload) => {
          setBookings(prev => [payload.new as Booking, ...prev]);
          toast({
            title: "New Booking Request!",
            description: `From ${(payload.new as Booking).name} for ${(payload.new as Booking).service}`,
          });
        }
      )
      .subscribe();

    return () => {
      contactsSubscription.unsubscribe();
      bookingsSubscription.unsubscribe();
    };
  }, [toast]);

  const fetchData = async () => {
    try {
      const [contactsResult, bookingsResult] = await Promise.all([
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('bookings').select('*').order('created_at', { ascending: false })
      ]);

      if (contactsResult.error) throw contactsResult.error;
      if (bookingsResult.error) throw bookingsResult.error;

      setContacts(contactsResult.data || []);
      setBookings(bookingsResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Check for admin access (simple implementation - in production, use proper auth)
  useEffect(() => {
    const adminAccess = localStorage.getItem('admin-access');
    if (adminAccess === 'true') {
      setIsVisible(true);
    }
  }, []);

  const enableAdminMode = () => {
    const password = prompt('Enter admin password:');
    if (password === 'admin123') { // In production, use secure auth
      localStorage.setItem('admin-access', 'true');
      setIsVisible(true);
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password",
        variant: "destructive",
      });
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={enableAdminMode}
          variant="ghost"
          size="sm"
          className="opacity-50 hover:opacity-100"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Card className="p-4">
          <div className="text-sm">Loading dashboard...</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Card className="glass p-4 border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Admin Dashboard</h3>
          <Button
            onClick={() => {
              localStorage.removeItem('admin-access');
              setIsVisible(false);
            }}
            variant="ghost"
            size="sm"
          >
            <EyeOff className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="text-sm">Messages:</span>
            <Badge variant="secondary">{contacts.length}</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm">Bookings:</span>
            <Badge variant="secondary">{bookings.length}</Badge>
          </div>
          
          {(contacts.length > 0 || bookings.length > 0) && (
            <div className="text-xs text-muted-foreground">
              Latest activity: {
                new Date(
                  Math.max(
                    contacts[0]?.created_at ? new Date(contacts[0].created_at).getTime() : 0,
                    bookings[0]?.created_at ? new Date(bookings[0].created_at).getTime() : 0
                  )
                ).toLocaleString()
              }
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;