import { Loader } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { Button, type ButtonProps } from "./button";

type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    ButtonProps & {
        isLoading: boolean;
    };

const LoadingButton: React.FC<LoadingButtonProps> = ({
    isLoading,
    children,
    ...props
}) => {
    return (
        <Button {...props} disabled={isLoading || props.disabled}>
            {isLoading ? (
                <>
                    <Loader className="animate-spin" /> Loading
                </>
            ) : (
                children
            )}
        </Button>
    );
};

export default LoadingButton;
