
import { Building, MapPin, Target, Globe, History, Award, Users } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getCartItemCount } from "@/lib/data";

const AboutUs = () => {
  const cartItemCount = getCartItemCount();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemCount={cartItemCount} />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/10 to-background py-16 mb-12">
          <div className="container max-w-5xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Qui sommes-nous</h1>
              <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
                Découvrez COMPUTER BUSINESS CENTER, votre partenaire technologique de confiance depuis plus de 17 ans.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="container max-w-5xl mx-auto px-6 mb-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Notre entreprise</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Building className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">17+ ans d'expertise</h3>
                    <p className="text-foreground/80">
                      COMPUTER BUSINESS CENTER s'appuie sur plus de 17 années d'expérience dans le domaine technologique, offrant une expertise solide et fiable.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Target className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Notre mission</h3>
                    <p className="text-foreground/80">
                      Notre mission : offrir des produits technologiques de qualité à nos clients tout en assurant un excellent service clientèle.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1581092921461-7a0e6a5f04e6?w=800&auto=format&fit=crop"
                alt="Computer Business Center Office" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>
        
        {/* Presence Section */}
        <section className="bg-accent py-16 mb-16">
          <div className="container max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-6">Notre présence internationale</h2>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-10">
                Nous opérons au Togo ainsi qu'à l'extérieur du pays, avec une présence établie dans plusieurs pays d'Afrique de l'Ouest.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                "Togo", 
                "Côte d'Ivoire", 
                "Bénin", 
                "Burkina Faso", 
                "Mali", 
                "Sénégal"
              ].map((country, index) => (
                <motion.div
                  key={country}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card shadow-sm rounded-lg p-6 text-center hover:shadow-md transition-shadow"
                >
                  <MapPin className="h-6 w-6 mx-auto mb-3 text-primary" />
                  <h3 className="font-medium">{country}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* History & Achievements */}
        <section className="container max-w-5xl mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Notre histoire</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Depuis notre création, nous avons connu une croissance constante et réalisé des objectifs ambitieux.
            </p>
          </motion.div>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <History className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Fondation en 2006</h3>
                  <p className="text-foreground/80">
                    COMPUTER BUSINESS CENTER a démarré ses activités à Lomé, au Togo, avec une petite équipe dédiée et une vision ambitieuse.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Expansion internationale</h3>
                  <p className="text-foreground/80">
                    Après avoir consolidé notre présence au Togo, nous avons étendu nos activités dans les pays voisins, en commençant par le Bénin et la Côte d'Ivoire.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-card shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Reconnaissance et partenariats</h3>
                  <p className="text-foreground/80">
                    Au fil des années, nous avons établi des partenariats solides avec des marques technologiques de premier plan, devenant un acteur incontournable dans notre secteur.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-card shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Notre équipe aujourd'hui</h3>
                  <p className="text-foreground/80">
                    Aujourd'hui, COMPUTER BUSINESS CENTER compte une équipe multiculturelle de professionnels qualifiés, tous dédiés à fournir les meilleures solutions technologiques à nos clients.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
