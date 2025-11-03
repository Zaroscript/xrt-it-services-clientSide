

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedGradientText = ({ children, className = "" }: AnimatedGradientTextProps) => (
  <span
    className={`bg-gradient-to-r from-primary via-purple-500 to-cyan-400 bg-clip-text text-transparent ${className}`}
  >
    {children}
  </span>
);

export default AnimatedGradientText;