import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, Zap, Target } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Menggunakan algoritma NLP canggih untuk menganalisis pola bahasa dan struktur berita"
    },
    {
      icon: Shield,
      title: "Akurasi Tinggi",
      description: "Trained dengan dataset berita hoax dan asli untuk memberikan prediksi yang akurat"
    },
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Analisis instan tanpa perlu menunggu, langsung di browser Anda"
    },
    {
      icon: Target,
      title: "Analisis Mendalam",
      description: "Tidak hanya prediksi, tetapi juga penjelasan faktor-faktor yang mempengaruhi hasil"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Bagaimana Cara Kerjanya?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sistem kami menggunakan teknologi Natural Language Processing (NLP) dan Machine Learning 
            untuk menganalisis berbagai aspek dari teks berita dan menentukan keasliannya
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card bg-gradient-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-elegant bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Teknologi yang Digunakan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-3 text-primary">Natural Language Processing</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Analisis sentiment dan emosi dalam teks</li>
                  <li>• Deteksi pola bahasa yang mencurigakan</li>
                  <li>• Evaluasi struktur dan format berita</li>
                  <li>• Pengecekan konsistensi informasi</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3 text-primary">Machine Learning Features</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Model transformer untuk pemahaman konteks</li>
                  <li>• Classification algorithms untuk kategorisasi</li>
                  <li>• Feature extraction dari berbagai aspek teks</li>
                  <li>• Confidence scoring untuk tingkat kepercayaan</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-primary/5 rounded-lg p-6 mt-6">
              <h4 className="font-semibold text-lg mb-3 text-center">Catatan Penting</h4>
              <p className="text-muted-foreground text-center">
                Sistem ini adalah alat bantu untuk analisis awal. Selalu verifikasi informasi dari sumber terpercaya 
                dan gunakan kemampuan berpikir kritis dalam menilai keaslian berita.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;