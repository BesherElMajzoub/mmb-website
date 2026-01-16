import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Message prepared to send to contact-us@mmbgermany.com');
    
    // Fallback to mailto
    window.location.href = `mailto:contact-us@mmbgermany.com?subject=Inquiry from ${data.name}&body=${encodeURIComponent(data.message)}`;
    
    setIsSubmitting(false);
    reset();
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-secondary text-secondary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/abstract-metal.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 font-light">
            We’ll be happy to work with you.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-8 text-foreground">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Name</label>
                    <Input 
                      id="name" 
                      {...register('name')} 
                      className="bg-white border-border h-12 rounded-none focus:ring-primary"
                      placeholder="Your Name"
                    />
                    {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Email</label>
                    <Input 
                      id="email" 
                      type="email"
                      {...register('email')} 
                      className="bg-white border-border h-12 rounded-none focus:ring-primary"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Company (Optional)</label>
                  <Input 
                    id="company" 
                    {...register('company')} 
                    className="bg-white border-border h-12 rounded-none focus:ring-primary"
                    placeholder="Your Company Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Message</label>
                  <Textarea 
                    id="message" 
                    {...register('message')} 
                    className="bg-white border-border min-h-[150px] rounded-none focus:ring-primary resize-none"
                    placeholder="How can we help you?"
                  />
                  {errors.message && <p className="text-destructive text-xs">{errors.message.message}</p>}
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wide rounded-none h-14 px-8 w-full md:w-auto"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-muted/30 p-8 border border-border">
                <h3 className="text-xl font-heading font-bold mb-6 text-foreground">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white border border-border flex items-center justify-center shrink-0 text-primary">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Headquarters</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Morsbach Maschinen Bau GmbH<br />
                        Industriestraße 15<br />
                        51597 Morsbach, Germany
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white border border-border flex items-center justify-center shrink-0 text-primary">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Email</h4>
                      <a href="mailto:contact-us@mmbgermany.com" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                        contact-us@mmbgermany.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white border border-border flex items-center justify-center shrink-0 text-primary">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Phone</h4>
                      <p className="text-muted-foreground text-sm">
                        +49 (0) 2294 123456
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative h-64 border border-border">
                <img src="/images/factory-exterior.jpg" alt="Office" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
