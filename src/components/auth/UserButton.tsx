import { SignInButton, SignedIn, SignedOut, UserButton as ClerkUserButton } from "@clerk/clerk-react";
import { User } from "lucide-react";

export const UserButton = () => {
  return (
    <div className="flex items-center">
      <SignedIn>
        <ClerkUserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors group">
            <User className="w-6 h-6 text-gray-400 group-hover:text-neon-purple transition-colors" />
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}; 