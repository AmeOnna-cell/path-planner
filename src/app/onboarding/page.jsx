"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Church,
  Palmtree,
  Landmark,
  Utensils,
  Mountain,
  Camera,
  History,
  ShoppingBag,
} from "lucide-react";

const INTERESTS = [
  { id: "churches", label: "Churches", icon: Church },
  { id: "beaches", label: "Beaches", icon: Palmtree },
  { id: "museums", label: "Museums", icon: Landmark },
  { id: "cuisine", label: "Cuisine", icon: Utensils },
  { id: "nature", label: "Nature", icon: Mountain },
  { id: "landmarks", label: "Landmarks", icon: Camera },
  { id: "history", label: "History", icon: History },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
];

export default function Onboarding() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleNext = () => {
    const queryString = selectedInterests
      .map((id) => `${id}=true`)
      .join("&");
    router.push(`/map?${queryString}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100">
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            What interests you?
          </h1>
          <p className="mb-12 text-lg text-slate-500">
            Select the experiences you'd like to include in your Ilocos Norte journey.
            We'll tailor recommendations just for you.
          </p>

          <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {INTERESTS.map((interest) => {
              const Icon = interest.icon;
              const isSelected = selectedInterests.includes(interest.id);

              return (
                <Card
                  key={interest.id}
                  className={cn(
                    "cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md border-2",
                    isSelected
                      ? "border-slate-900 bg-slate-50"
                      : "border-transparent bg-slate-50 hover:bg-slate-100"
                  )}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div
                      className={cn(
                        "mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors",
                        isSelected
                          ? "bg-slate-900 text-white"
                          : "bg-white text-slate-900 shadow-sm"
                      )}
                    >
                      <Icon size={24} />
                    </div>
                    <span className="font-medium">{interest.label}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="h-14 rounded-full border-slate-200 px-8 text-lg hover:bg-slate-50"
              onClick={() => router.push("/map")}
            >
              Back
            </Button>
            <Button
              size="lg"
              disabled={selectedInterests.length === 0}
              className={cn(
                "h-14 rounded-full px-10 text-lg font-semibold text-white",
                selectedInterests.length === 0
                  ? "bg-slate-900 opacity-50 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-slate-800 hover:shadow-lg"
              )}
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
