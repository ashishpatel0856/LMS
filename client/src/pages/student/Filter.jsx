import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const categories = [
  { id: "nextjs", level: "Next Js" },
  { id: "react", level: "React Js" },
  { id: "node", level: "Node Js" },
  { id: "mongodb", level: "MongoDB" },
  { id: "express", level: "Express Js" },
  { id: "javascript", level: "JavaScript" },
  { id: "typescript", level: "TypeScript" },
  { id: "html", level: "HTML" },
  { id: "css", level: "CSS" },
  { id: "tailwind", level: "Tailwind CSS" },
  { id: "bootstrap", level: "Bootstrap" },
  { id: "redux", level: "Redux" },
  { id: "graphql", level: "GraphQL" },
  { id: "restapi", level: "REST API" },
  { id: "firebase", level: "Firebase" },
  { id: "docker", level: "Docker" },
  { id: "kubernetes", level: "Kubernetes" },
  { id: "aws", level: "AWS" },
  { id: "git", level: "Git" },
  { id: "github", level: "GitHub" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  // Handle Category Change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];

      handleFilterChange(updatedCategories, sortByPrice);

      return updatedCategories;
    });
  };

  // Handle Price Sort
  const selectByPriceHandler = (value) => {
    setSortByPrice(value);
    handleFilterChange(selectedCategories, value);
  };

  return (
    <div className="w-full lg:w-[25%] border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="font-bold text-lg md:text-xl">
          Filter Options
        </h1>

        {/* Sort */}
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>

              <SelectItem value="low">
                Low to High
              </SelectItem>

              <SelectItem value="high">
                High to Low
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />

      {/* Categories */}
      <div>
        <h1 className="font-semibold text-base mb-3">
          Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={cat.id}
                onCheckedChange={() =>
                  handleCategoryChange(cat.id)
                }
              />

              <Label
                htmlFor={cat.id}
                className="text-sm cursor-pointer"
              >
                {cat.level}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;