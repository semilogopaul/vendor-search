"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Search, FileSpreadsheet, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface VendorRecord {
  VENDOR: string;
  PRODUCTS: string[];
  PERSONNEL: string[];
  EMAIL: string[];
  NUMBER: string[];
}

export default function VendorSearchApp() {
  const [records, setRecords] = useState<VendorRecord[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchType, setSearchType] = useState("VENDOR");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<VendorRecord[]>([]);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    try {
      // Dynamically import XLSX
      const XLSX = await import("xlsx");

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
            header: 1,
          }) as any[][];

          processExcelData(jsonData);
          setShowSearch(true);
        } catch (error) {
          console.error("Error reading the Excel file: ", error);
          alert("Error reading the Excel file. Please check the format.");
        }
      };

      reader.onerror = (e) => {
        console.error("File could not be read! Code " + e.target?.error);
        alert("File could not be read!");
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error loading XLSX library:", error);
      alert("Error loading Excel processing library.");
    }
  };

  const processExcelData = (data: any[][]) => {
    const processedRecords: VendorRecord[] = [];
    let currentRecord: Partial<VendorRecord> = {};

    for (let i = 0; i < data.length; i++) {
      if (data[i].length === 0) continue;

      const rowType = data[i][0]?.toString().toUpperCase();

      switch (rowType) {
        case "VENDOR":
          if (Object.keys(currentRecord).length > 0) {
            processedRecords.push(currentRecord as VendorRecord);
            currentRecord = {};
          }
          currentRecord.VENDOR = data[i][1] ? String(data[i][1]) : "";
          break;
        case "PRODUCTS":
          if (!currentRecord.PRODUCTS) currentRecord.PRODUCTS = [];
          for (let j = 1; j < data[i].length; j++) {
            if (data[i][j]) currentRecord.PRODUCTS.push(String(data[i][j]));
          }
          break;
        case "PERSONNEL":
          if (!currentRecord.PERSONNEL) currentRecord.PERSONNEL = [];
          for (let j = 1; j < data[i].length; j++) {
            if (data[i][j]) currentRecord.PERSONNEL.push(String(data[i][j]));
          }
          break;
        case "EMAIL":
          if (!currentRecord.EMAIL) currentRecord.EMAIL = [];
          for (let j = 1; j < data[i].length; j++) {
            if (data[i][j]) currentRecord.EMAIL.push(String(data[i][j]));
          }
          break;
        case "NUMBER":
          if (!currentRecord.NUMBER) currentRecord.NUMBER = [];
          for (let j = 1; j < data[i].length; j++) {
            if (data[i][j]) currentRecord.NUMBER.push(String(data[i][j]));
          }
          break;
      }
    }

    if (Object.keys(currentRecord).length > 0) {
      processedRecords.push(currentRecord as VendorRecord);
    }

    setRecords(processedRecords);
    console.log("Processed records:", processedRecords);
  };

  const searchRecords = () => {
    const query = searchQuery.trim().toUpperCase();

    if (!query) {
      alert("Please enter a search term.");
      return;
    }

    const filteredRecords = records.filter((record) => {
      switch (searchType) {
        case "VENDOR":
          return record.VENDOR?.toUpperCase().includes(query);
        case "PRODUCTS":
          return record.PRODUCTS?.some((product) =>
            product.toUpperCase().includes(query)
          );
        case "PERSONNEL":
          return record.PERSONNEL?.some((person) =>
            person.toUpperCase().includes(query)
          );
        case "EMAIL":
          return record.EMAIL?.some((email) =>
            email.toUpperCase().includes(query)
          );
        case "NUMBER":
          return record.NUMBER?.some((number) =>
            number.toUpperCase().includes(query)
          );
        default:
          return false;
      }
    });

    setSearchResults(filteredRecords);
  };

  const renderSearchResult = (record: VendorRecord, index: number) => {
    const query = searchQuery.trim().toUpperCase();
    let matchIndex = 0;

    if (searchType !== "VENDOR") {
      switch (searchType) {
        case "PRODUCTS":
          matchIndex =
            record.PRODUCTS?.findIndex((product) =>
              product.toUpperCase().includes(query)
            ) || 0;
          break;
        case "PERSONNEL":
          matchIndex =
            record.PERSONNEL?.findIndex((person) =>
              person.toUpperCase().includes(query)
            ) || 0;
          break;
        case "EMAIL":
          matchIndex =
            record.EMAIL?.findIndex((email) =>
              email.toUpperCase().includes(query)
            ) || 0;
          break;
        case "NUMBER":
          matchIndex =
            record.NUMBER?.findIndex((number) =>
              number.toUpperCase().includes(query)
            ) || 0;
          break;
      }
    }

    return (
      <div key={index} className="mb-4 p-4 border-b border-slate-600">
        <div className="space-y-2">
          {searchType === "VENDOR" ? (
            <>
              <p className="text-white">
                <span className="font-semibold text-[#a56c32]">Vendor:</span>{" "}
                {record.VENDOR}
              </p>
              <p className="text-white">
                <span className="font-semibold text-[#a56c32]">Products:</span>{" "}
                {record.PRODUCTS?.join(", ")}
              </p>
              <p className="text-white">
                <span className="font-semibold text-[#a56c32]">Personnel:</span>{" "}
                {record.PERSONNEL?.join(", ")}
              </p>
              <p className="text-white">
                <span className="font-semibold text-[#a56c32]">Email:</span>{" "}
                {record.EMAIL?.join(", ")}
              </p>
              <p className="text-white">
                <span className="font-semibold text-[#a56c32]">Number:</span>{" "}
                {record.NUMBER?.join(", ")}
              </p>
            </>
          ) : (
            <>
              <p className="text-white">
                <span className="font-semibold text-[#a56c32]">Vendor:</span>{" "}
                {record.VENDOR}
              </p>
              <p className="text-white">
                <span className="font-semibold text-[#a56c32]">Product:</span>{" "}
                {record.PRODUCTS?.[matchIndex] || "N/A"}
              </p>
              <p className="text-white">
                <span className="font-semibold text-[#a56c32]">Personnel:</span>{" "}
                {record.PERSONNEL?.[matchIndex] || "N/A"}
              </p>
              <p className="text-white">
                <span className="font-semibold text-[#a56c32]">Email:</span>{" "}
                {record.EMAIL?.[matchIndex] || "N/A"}
              </p>
              <p className="text-white">
                <span className="font-semibold text-[#a56c32]">Number:</span>{" "}
                {record.NUMBER?.[matchIndex] || "N/A"}
              </p>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Header with back button */}
      <div className="relative z-10 border-b border-[#a56c32]/20 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-3 text-white hover:text-[#a56c32] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <span className="text-lg font-bold text-white"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Logo placeholder */}
        <div className="flex justify-center mb-8">
          <Image
            src="/zbs logo.png"
            alt="VendorSearch Logo"
            width={300}
            height={200}
          />
        </div>

        {!showSearch ? (
          <Card className="bg-slate-800/90 border-[#a56c32]/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-white text-xl">
                Upload Excel File to Proceed
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-[#a56c32]/50 rounded-lg p-8 hover:border-[#a56c32] transition-colors">
                  <Upload className="w-12 h-12 text-[#a56c32] mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-white mb-2">
                      {fileName || "Choose Excel file (.xlsx)"}
                    </p>
                    <Button
                      onClick={handleFileButtonClick}
                      className="bg-[#a56c32] hover:bg-[#8b5a2a] text-white"
                    >
                      Choose File
                    </Button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-slate-800/90 border-[#a56c32]/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-white text-xl">
                Search Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Select value={searchType} onValueChange={setSearchType}>
                    <SelectTrigger className="bg-slate-700 border-[#a56c32]/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-[#a56c32]/30">
                      <SelectItem value="VENDOR">VENDOR</SelectItem>
                      <SelectItem value="PRODUCTS">PRODUCTS</SelectItem>
                      <SelectItem value="PERSONNEL">PERSONNEL</SelectItem>
                      <SelectItem value="EMAIL">EMAIL</SelectItem>
                      <SelectItem value="NUMBER">NUMBER</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type="text"
                    placeholder="Enter search term..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-700 border-[#a56c32]/30 text-white placeholder:text-slate-400"
                    onKeyPress={(e) => e.key === "Enter" && searchRecords()}
                  />

                  <Button
                    onClick={searchRecords}
                    className="bg-[#a56c32] hover:bg-[#8b5a2a] text-white whitespace-nowrap"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>

                {searchResults.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-white text-lg font-semibold mb-4">
                      Search Results ({searchResults.length} found)
                    </h3>
                    <div className="space-y-0 max-h-96 overflow-y-auto bg-slate-900/50 rounded-lg p-4">
                      {searchResults.map((record, index) =>
                        renderSearchResult(record, index)
                      )}
                    </div>
                  </div>
                )}

                {searchQuery && searchResults.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-400">No records found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
