import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Camera, AlertCircle, CheckCircle, X } from "lucide-react";
import { Navbar } from "@/components/navbar";
import React, { useRef, useState } from 'react';

export function UploadPrescriptionPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [patientName, setPatientName] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [prescriptionDate, setPrescriptionDate] = useState("");
    const [notes, setNotes] = useState("");
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setUploadStatus('error');
                setMessage('File size must be less than 10MB');
                return;
            }

            // Check file type
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                setUploadStatus('error');
                setMessage('Please upload a JPG, PNG, or PDF file');
                return;
            }

            setSelectedFile(file);
            setFileName(file.name); // Extract just the filename
            setUploadStatus('success');
            setMessage(`File selected: ${file.name}`);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];

            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setUploadStatus('error');
                setMessage('File size must be less than 10MB');
                return;
            }

            // Check file type
            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                setUploadStatus('error');
                setMessage('Please upload a JPG, PNG, or PDF file');
                return;
            }

            setSelectedFile(file);
            setFileName(file.name); // Extract just the filename
            setUploadStatus('success');
            setMessage(`File selected: ${file.name}`);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setFileName("");
        setUploadStatus('idle');
        setMessage("");
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = () => {
        if (patientName && doctorName && hospitalName && prescriptionDate && notes && selectedFile && fileName) {
            // Here you would typically send the data to your backend
            console.log('Prescription Data:', {
                fileName: fileName, // Only the filename is stored/sent
                patientName,
                doctorName,
                hospitalName,
                prescriptionDate,
                notes,
                fileSize: selectedFile.size,
                fileType: selectedFile.type
            });

            setUploadStatus('success');
            setMessage('Prescription uploaded successfully!');
        } else if (!selectedFile || !fileName) {
            setUploadStatus('error');
            setMessage('Please upload a prescription image!');
        } else {
            setUploadStatus('error');
            setMessage('Please fill all fields!');
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />

        {/* Status Message */}
        {message && (
            <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
                uploadStatus === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                    uploadStatus === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
                    'bg-blue-100 text-blue-800 border border-blue-200'
            }`}>
            <div className="flex items-center space-x-2">
            {uploadStatus === 'success' && <CheckCircle className="h-5 w-5" />}
            {uploadStatus === 'error' && <AlertCircle className="h-5 w-5" />}
            <span>{message}</span>
            <button onClick={() => setMessage('')} className="ml-2">
            <X className="h-4 w-4" />
            </button>
            </div>
            </div>
        )}

        <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Upload Your Prescription</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Easily upload your prescription, and we'll prepare your medicines for quick pickup or delivery.
                </p>
            </div>

        <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
        <Card className="shadow-xl border-none bg-white rounded-xl transition-all hover:shadow-2xl p-6">
        <CardHeader className="mb-4">
        <CardTitle className="flex items-center text-blue-700 text-2xl font-semibold">
        <FileText className="h-6 w-6 mr-3 text-blue-600" />
        Prescription Details
        </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700">
        <div>
        <Label className="mb-2 font-medium text-gray-800" htmlFor="patientName">Patient Name</Label>
        <Input
        id="patientName"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        placeholder="Enter patient full name"
        className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
        />
        </div>
        <div>
        <Label className="mb-2 font-medium text-gray-800" htmlFor="doctorName">Doctor Name</Label>
        <Input
        id="doctorName"
        value={doctorName}
        onChange={(e) => setDoctorName(e.target.value)}
        placeholder="Enter doctor name"
        className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
        />
        </div>
        <div>
        <Label className="mb-2 font-medium text-gray-800" htmlFor="hospitalName">Hospital/Clinic Name</Label>
        <Input
        id="hospitalName"
        value={hospitalName}
        onChange={(e) => setHospitalName(e.target.value)}
        placeholder="Enter hospital or clinic name"
        className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
        />
        </div>
        <div>
        <Label className="mb-2 font-medium text-gray-800" htmlFor="prescriptionDate">Prescription Date</Label>
        <Input
        id="prescriptionDate"
        type="date"
        value={prescriptionDate}
        onChange={(e) => setPrescriptionDate(e.target.value)}
        className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
        />
        </div>
        <div>
        <Label className="mb-2 font-medium text-gray-800" htmlFor="notes">Additional Notes</Label>
        <Textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Any special instructions or notes for the pharmacist"
        rows={4}
        className="border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg"
        />
        </div>
        </CardContent>
        </Card>

        <Card className="shadow-xl border-none bg-white rounded-xl transition-all hover:shadow-2xl p-6">
        <CardHeader>
        <CardTitle className="flex items-center text-blue-700 text-xl font-semibold">
        <Upload className="h-6 w-6 mr-3 text-blue-600" />
        Upload Prescription Image
        </CardTitle>
        </CardHeader>
        <CardContent>
        <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
            selectedFile
                ? 'border-green-400 bg-green-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={!selectedFile ? triggerFileInput : undefined}
        >
        <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,application/pdf"
        onChange={handleFileUpload}
        className="hidden"
        />

        {selectedFile ? (
            <div className="space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <div>
            <p className="text-xl font-semibold text-gray-800">File Selected</p>
            <p className="text-gray-600 mt-2">
            <strong>Filename:</strong> {fileName}
            </p>
            <p className="text-sm text-gray-500">
            Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
            </div>
            <div className="flex justify-center space-x-4">
            <Button
            variant="outline"
            onClick={removeFile}
            className="border-red-500 text-red-600 hover:bg-red-100"
            >
            <X className="h-5 w-5 mr-2" />
            Remove File
            </Button>
            <Button
            variant="outline"
            onClick={triggerFileInput}
            className="border-blue-500 text-blue-600 hover:bg-blue-100"
            >
            <Upload className="h-5 w-5 mr-2" />
            Choose Different File
            </Button>
            </div>
            </div>
        ) : (
        <div className="space-y-6">
        <div className="flex justify-center space-x-6">
        <Camera className="h-16 w-16 text-blue-500" />
        <Upload className="h-16 w-16 text-blue-500" />
        </div>
        <div>
        <p className="text-xl font-semibold text-gray-800">Upload Prescription</p>
        <p className="text-gray-600 mt-2">
        Drag and drop your prescription image or click to browse
        </p>
        </div>
        <div className="flex justify-center space-x-4">
        <Button
        variant="outline"
        onClick={triggerFileInput}
        className="border-blue-500 text-blue-600 hover:bg-blue-100 transition-all w-32"
        >
        <Camera className="h-5 w-5 mr-2" />
        Take Photo
        </Button>
        <Button
        variant="outline"
        onClick={triggerFileInput}
        className="border-blue-500 text-blue-600 hover:bg-blue-100 transition-all w-32"
        >
        <Upload className="h-5 w-5 mr-2" />
        Upload File
        </Button>
        </div>
        <p className="text-sm text-gray-500">
        Supported formats: JPG, PNG, PDF (Max 10MB)
        </p>
        </div>
        )}
        </div>
        </CardContent>
        </Card>
        </div>

        <div className="space-y-6">
        <Card className="shadow-xl border-none bg-white rounded-xl transition-all hover:shadow-2xl p-6">
        <CardHeader>
        <CardTitle className="flex items-center text-blue-700 text-xl font-semibold mb-4">
        <CheckCircle className="h-6 w-6 mr-3 text-blue-600" />
        How It Works
        </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-6">
        <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-blue-700 text-base font-bold">1</span>
        </div>
        <div>
        <h4 className="font-semibold text-gray-800">Upload Prescription</h4>
        <p className="text-sm text-gray-600">
        Take a clear photo or upload an image of your prescription
        </p>
        </div>
        </div>
        <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-blue-700 text-base font-bold">2</span>
        </div>
        <div>
        <h4 className="font-semibold text-gray-800">Pharmacist Review</h4>
        <p className="text-sm text-gray-600">
        Our licensed pharmacist will review and verify your prescription
        </p>
        </div>
        </div>
        <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-blue-700 text-base font-bold">3</span>
        </div>
        <div>
        <h4 className="font-semibold text-gray-800">Preparation & Delivery</h4>
        <p className="text-sm text-gray-600">
        We'll prepare your medicines and deliver them to your doorstep
        </p>
        </div>
        </div>
        </div>
        </CardContent>
        </Card>

        <Card className="shadow-xl border-none bg-white rounded-xl transition-all hover:shadow-2xl p-6">
        <CardHeader>
        <CardTitle className="flex items-center text-orange-600 text-xl font-semibold mb-4">
        <AlertCircle className="h-6 w-6 mr-3 text-orange-500" />
        Important Guidelines
        </CardTitle>
        </CardHeader>
        <CardContent>
        <ul className="space-y-3 text-sm text-gray-600">
        <li className="flex items-start">
        <span className="mr-2">•</span> Ensure prescription is clearly visible and readable
        </li>
        <li className="flex items-start">
        <span className="mr-2">•</span> Prescription must be issued within the last 30 days
        </li>
        <li className="flex items-start">
        <span className="mr-2">•</span> Include doctor's signature and hospital stamp
        </li>
        <li className="flex items-start">
        <span className="mr-2">•</span> Patient information must match your profile
        </li>
        <li className="flex items-start">
        <span className="mr-2">•</span> For controlled substances, additional verification may be required
            </li>
        </ul>
        </CardContent>
        </Card>

        <div className="space-y-4">
        <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-105"
        size="lg"
        onClick={handleSubmit}
        >
        Submit Prescription
        </Button>
        <p className="text-center text-sm text-gray-600">
        Need help? Call our pharmacist at{" "}
        <a href="tel:18006928" className="text-blue-600 font-semibold hover:underline">
        1800 6928
        </a>
        </p>
        </div>
        </div>
        </div>
        </div>
        </div>
    );
}
