"use client";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { useAppDispatch } from "@/hooks/useRedux";
import { removeEducation } from "@/store/slices/onboardingSlice";
import { month } from "@/lib/datetime";
import { Trash } from "lucide-react";
import { setStep } from "@/store/slices/onboardinhStepChecker";

interface ItemType {
    institute: string;
    course: string;
    startDate: {
        month: number;
        year: number;
    };
    endDate?: {
        month: number;
        year: number;
    };
    description?: string;
}

export function EducationList({ items }: { items: ItemType[] }) {
    const dispatch = useAppDispatch();

    const handleDelete = (value: number) => {
        dispatch(setStep(3))
        dispatch(removeEducation(value));
    };

    return (
        <div className=" mx-auto space-y-4">
            {items.map((val, index) => (
                <Card
                    key={index}
                    className="p-4 shadow-sm hover:shadow-md transition-all"
                >
                    <CardContent className="space-y-2 relative">
                        {/* delete icon right side */}
                        <Trash
                            onClick={() => handleDelete(index)}
                            className="absolute right-3 top-3 cursor-pointer hover:text-red-500 transition"
                        />

                        {/* Institute */}
                        <p>
                            <span className="font-semibold text-gray-700">Institute:</span>{" "}
                            {val.institute}
                        </p>

                        {/* Course */}
                        <p>
                            <span className="font-semibold text-gray-700">Course:</span>{" "}
                            {val.course}
                        </p>

                        {/* Duration */}
                        <div className="flex flex-wrap gap-5 mt-1">
                            <p>
                                <span className="font-semibold text-gray-700">Start:</span>{" "}
                                {month[val.startDate.month]} {val.startDate.year}
                            </p>

                            <p>
                                <span className="font-semibold text-gray-700">End:</span>{" "}
                                {val.endDate
                                    ? `${month[val.endDate.month]} ${val.endDate.year}`
                                    : "Present"}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="mt-1 leading-relaxed">
                            <span className="font-semibold text-gray-700">Description:</span>{" "}
                            {val.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default EducationList;
