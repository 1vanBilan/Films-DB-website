interface StarIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const StarIcon = ({
  width = 20,
  height = 20,
  color = "#ffffff",
}: StarIconProps) => {
  return (
    <svg
      height={`${height}px`}
      width={`${width}px`}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.93384 12.8589L14.1868 16L12.7928 10.08L17.4338 6.09684L11.3223 5.57474L8.93384 0L6.54534 5.57474L0.433838 6.09684L5.06634 10.08L3.68084 16L8.93384 12.8589Z"
        fill={color}
      />
    </svg>
  );
};
