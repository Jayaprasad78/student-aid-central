
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const UploadMaterial = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title || !description || !category || !fileType || !file) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and upload a file.",
        variant: "destructive",
      });
      return;
    }
    
    // Mock upload progress
    setIsUploading(true);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Simulate upload completion
          setTimeout(() => {
            toast({
              title: "Upload successful",
              description: "Your material has been uploaded successfully.",
            });
            setIsUploading(false);
            navigate("/materials");
          }, 500);
          
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Try to determine file type from extension
      const extension = selectedFile.name.split('.').pop()?.toLowerCase();
      if (extension === 'pdf') {
        setFileType('PDF');
      } else if (['doc', 'docx'].includes(extension || '')) {
        setFileType('Document');
      } else if (['ppt', 'pptx'].includes(extension || '')) {
        setFileType('Presentation');
      } else if (['xls', 'xlsx'].includes(extension || '')) {
        setFileType('Spreadsheet');
      } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
        setFileType('Image');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-edu-primary py-12 px-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-white mb-4">Upload Study Material</h1>
            <p className="text-white/90 max-w-2xl">
              Share your notes, study guides, or other academic resources with the community.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto py-8 px-6">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Upload Material</CardTitle>
              <CardDescription>
                Upload educational materials to help other students in their studies.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Material Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Calculus I Study Guide" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="literature">Literature</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="languages">Languages</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fileType">File Type</Label>
                    <Select value={fileType} onValueChange={setFileType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select file type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PDF">PDF</SelectItem>
                        <SelectItem value="Document">Document</SelectItem>
                        <SelectItem value="Presentation">Presentation</SelectItem>
                        <SelectItem value="Spreadsheet">Spreadsheet</SelectItem>
                        <SelectItem value="Image">Image</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide a brief description of this material..." 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Input 
                      id="file" 
                      type="file" 
                      className="hidden"
                      onChange={handleFileChange}
                      required
                    />
                    <Label 
                      htmlFor="file" 
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      {file ? (
                        <div className="flex items-center gap-2 text-edu-primary">
                          <File size={24} />
                          <span className="font-medium">{file.name}</span>
                          <span className="text-sm text-gray-500">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                      ) : (
                        <>
                          <Upload size={36} className="mb-2 text-gray-400" />
                          <div className="text-sm text-gray-500">
                            <span className="font-medium text-edu-primary">Click to upload</span> or drag and drop
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF, Word, PowerPoint, Excel or image files
                          </p>
                        </>
                      )}
                    </Label>
                  </div>
                </div>
                
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
                
                <div className="flex justify-end pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="mr-2"
                    onClick={() => navigate("/materials")}
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-edu-primary hover:bg-edu-secondary"
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload Material"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UploadMaterial;
