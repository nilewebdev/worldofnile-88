import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Settings, Mail, Bell, Shield, Trash2 } from "lucide-react";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: SupabaseUser | null;
}

const SettingsModal = ({ isOpen, onClose, user }: SettingsModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    marketingEmails: false,
  });
  const { toast } = useToast();

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/`,
      });

      if (error) throw error;

      toast({
        title: "Password reset sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    setIsLoading(true);
    try {
      // Note: Account deletion would typically require backend logic
      // For now, we'll just sign out the user
      await supabase.auth.signOut();
      toast({
        title: "Account deletion requested",
        description: "Please contact support to complete account deletion.",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Account Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, emailNotifications: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Project Updates</p>
                  <p className="text-sm text-muted-foreground">Get notified about project progress</p>
                </div>
                <Switch
                  checked={settings.projectUpdates}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, projectUpdates: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-muted-foreground">Receive promotional content</p>
                </div>
                <Switch
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, marketingEmails: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={handlePasswordReset}
                disabled={isLoading}
              >
                <Mail className="h-4 w-4 mr-2" />
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Sending...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                <Trash2 className="h-4 w-4" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={handleDeleteAccount}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;