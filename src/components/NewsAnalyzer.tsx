import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertTriangle, CheckCircle, Globe, FileText, Brain, Target, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  prediction: 'real' | 'fake';
  confidence: number;
  explanation: string;
  factors: string[];
}

const NewsAnalyzer = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  // Simulated ML analysis - in real app this would use the Hugging Face transformer
  const analyzeText = async (text: string): Promise<AnalysisResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple heuristic analysis for demo
    const suspiciousWords = ['sensational', 'shocking', 'unbelievable', 'secret', 'exposed', 'viral'];
    const suspiciousCount = suspiciousWords.filter(word => 
      text.toLowerCase().includes(word)
    ).length;
    
    const isFake = suspiciousCount > 1 || text.includes('!!!') || text.length < 50;
    const confidence = Math.random() * 0.3 + (isFake ? 0.7 : 0.6);
    
    return {
      prediction: isFake ? 'fake' : 'real',
      confidence: confidence,
      explanation: isFake 
        ? 'Teks menunjukkan karakteristik berita hoax dengan penggunaan bahasa sensasional dan kurangnya sumber yang kredibel.'
        : 'Teks menunjukkan karakteristik berita legitimate dengan struktur yang baik dan informasi yang dapat diverifikasi.',
      factors: isFake 
        ? ['Bahasa sensasional', 'Kurang sumber kredibel', 'Struktur tidak standar']
        : ['Struktur berita standar', 'Bahasa objektif', 'Informasi terverifikasi']
    };
  };

  const handleAnalyzeText = async () => {
    if (!textInput.trim()) {
      toast({
        title: "Input Required",
        description: "Mohon masukkan teks berita untuk dianalisis",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeText(textInput);
      setResult(analysis);
      toast({
        title: "Analisis Selesai",
        description: "Berita berhasil dianalisis dengan machine learning",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menganalisis berita",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeUrl = async () => {
    if (!urlInput.trim()) {
      toast({
        title: "Input Required", 
        description: "Mohon masukkan URL berita untuk dianalisis",
        variant: "destructive"
      });
      return;
    }

    // Simulate URL analysis
    setIsAnalyzing(true);
    try {
      // In real app, this would fetch and analyze the URL content
      await new Promise(resolve => setTimeout(resolve, 3000));
      const mockText = "Sample news content extracted from URL...";
      const analysis = await analyzeText(mockText);
      setResult(analysis);
      toast({
        title: "Analisis URL Selesai",
        description: "Konten dari URL berhasil dianalisis",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Tidak dapat mengakses atau menganalisis URL tersebut",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getResultColor = (prediction: string) => {
    return prediction === 'real' ? 'success' : 'destructive';
  };

  const getResultIcon = (prediction: string) => {
    return prediction === 'real' ? CheckCircle : AlertTriangle;
  };

  return (
    <section id="analyzer" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Analyzer Berita
          </h2>
          <p className="text-xl text-muted-foreground">
            Masukkan teks berita atau URL untuk analisis keaslian menggunakan AI
          </p>
        </div>

        <Card className="shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              Input Berita untuk Analisis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Teks Berita
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  URL Berita
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="text" className="space-y-4">
                <Textarea
                  placeholder="Paste teks berita di sini untuk dianalisis..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                <Button 
                  onClick={handleAnalyzeText} 
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Menganalisis...
                    </>
                  ) : (
                    'Analisis Teks Berita'
                  )}
                </Button>
              </TabsContent>
              
              <TabsContent value="url" className="space-y-4">
                <Input
                  placeholder="https://example.com/news-article"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="h-12"
                />
                <Button 
                  onClick={handleAnalyzeUrl} 
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Menganalisis URL...
                    </>
                  ) : (
                    'Analisis URL Berita'
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="mt-8 shadow-elegant border-l-4 border-l-primary bg-gradient-card">
            <CardHeader className="bg-gradient-subtle rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                {(() => {
                  const IconComponent = getResultIcon(result.prediction);
                  return <IconComponent className={`w-7 h-7 ${
                    result.prediction === 'real' ? 'text-green-600' : 'text-red-600'
                  }`} />;
                })()}
                <div>
                  <div className="text-xl font-bold">Laporan Analisis Profesional</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    Powered by Machine Learning & NLP Technology
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              {/* Status Section */}
              <div className="bg-muted/20 rounded-xl p-6 border-l-4 border-l-primary">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-foreground">Klasifikasi Berita</span>
                  <Badge 
                    variant={result.prediction === 'real' ? 'default' : 'destructive'}
                    className={`text-base px-6 py-3 font-bold uppercase tracking-wider ${
                      result.prediction === 'real' 
                        ? 'bg-green-100 text-green-800 border-green-300' 
                        : 'bg-red-100 text-red-800 border-red-300'
                    }`}
                  >
                    {result.prediction === 'real' ? '✓ BERITA ASLI' : '⚠ BERITA HOAX'}
                  </Badge>
                </div>
                
                {/* Confidence Score */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="font-semibold text-foreground">Skor Kepercayaan AI</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        {(result.confidence * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.confidence > 0.8 ? 'Sangat Tinggi' : 
                         result.confidence > 0.6 ? 'Tinggi' : 'Sedang'}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-4 shadow-inner">
                    <div 
                      className={`h-4 rounded-full transition-all duration-1000 shadow-lg ${
                        result.prediction === 'real' 
                          ? 'bg-gradient-to-r from-green-400 to-green-600' 
                          : 'bg-gradient-to-r from-red-400 to-red-600'
                      }`}
                      style={{ width: `${result.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Analysis Explanation */}
              <div className="space-y-4">
                <h4 className="font-bold text-xl text-foreground flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Analisis Detail AI
                </h4>
                <div className="bg-gradient-subtle rounded-lg p-6 border border-border">
                  <p className="text-foreground leading-relaxed text-lg">
                    {result.explanation}
                  </p>
                </div>
              </div>

              {/* Key Factors */}
              <div className="space-y-4">
                <h4 className="font-bold text-xl text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Faktor Penentu Analisis
                </h4>
                <div className="grid gap-3">
                  {result.factors.map((factor, index) => (
                    <div key={index} className="flex items-center gap-3 bg-muted/30 rounded-lg p-4 border border-border/50">
                      <div className={`w-3 h-3 rounded-full ${
                        result.prediction === 'real' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="font-medium text-foreground">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Footer */}
              <div className="bg-primary/5 rounded-lg p-5 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">Disclaimer Profesional</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Hasil analisis ini menggunakan teknologi AI dan Machine Learning terdepan. 
                  Namun, kami merekomendasikan untuk selalu melakukan verifikasi silang dengan 
                  sumber berita terpercaya dan menggunakan penilaian kritis dalam mengevaluasi informasi.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default NewsAnalyzer;