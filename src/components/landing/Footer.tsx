const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4">SafeStep AR</h4>
            <p className="text-muted-foreground text-sm">
              Navigating home without fear, together.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-accent mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-accent transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Download</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Whitepaper</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-accent mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">GitHub</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-accent mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-8 mt-8 border-t border-border text-muted-foreground text-sm">
          © 2026 SafeStep AR. All rights reserved. Built for #75HER Challenge.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
