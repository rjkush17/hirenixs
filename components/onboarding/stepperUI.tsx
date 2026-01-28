import { Separator } from "@/components/ui/separator";

type StepperProps = {
    current: number;
    total: number;
};

function stepperUI({ current, total }: StepperProps) {
    return (
        <div className="flex justify-center items-center gap-3 max-w-96 mx-auto">
            <Separator className="flex-1" />
            <p className="text-muted-foreground whitespace-nowrap">
                Step {current} of {total}
            </p>
            <Separator className="flex-1" />
        </div>
    );
}

export default stepperUI;
