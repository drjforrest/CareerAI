import PreferencesForm from "@/components/preferences/preferences-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PreferencesPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Preferences</h1>
        <p className="text-muted-foreground">
          Customize your CareerCraft AI experience.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Style & Language Settings</CardTitle>
          <CardDescription>
            Set your default writing tone, preferred language, and CV formats.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PreferencesForm />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account details and notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Account management features coming soon.</p>
           {/* Example: Change password, email notifications */}
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Manage your data privacy and delete your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            You can request to delete all your personal data. This action is irreversible.
          </p>
          <Button variant="destructive">Delete My Account & Data</Button>
        </CardContent>
      </Card>
    </div>
  );
}

