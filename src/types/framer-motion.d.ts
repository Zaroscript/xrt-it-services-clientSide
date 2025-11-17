import 'framer-motion';

// Extend the existing module declarations
declare module 'framer-motion' {
  // Extend the HTMLMotionProps interface to include all the motion props we need
  export interface HTMLMotionProps<T extends keyof React.JSX.IntrinsicElements = 'div'>
    extends React.HTMLAttributes<HTMLElement> {
    // Standard HTML attributes
    className?: string;
    
    // Animation props
    initial?: boolean | any;
    animate?: any;
    exit?: any;
    
    // Interaction props
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    
    // Viewport props
    viewport?: {
      once?: boolean;
      amount?: number | 'some' | 'all';
      margin?: string;
    };
    
    // Transition props
    transition?: any;
    
    // Layout animation props
    layout?: boolean | 'position' | 'size' | 'preserve-aspect';
    
    // Other common motion props
    variants?: any;
    custom?: any;
    
    // Event handlers
    onAnimationStart?: () => void;
    onAnimationComplete?: () => void;
    onUpdate?: (latest: any) => void;
    onHoverStart?: (e: MouseEvent) => void;
    onHoverEnd?: (e: MouseEvent) => void;
    onDragStart?: (e: MouseEvent | TouchEvent | PointerEvent) => void;
    onDragEnd?: (e: MouseEvent | TouchEvent | PointerEvent) => void;
    onViewportEnter?: () => void;
    onViewportLeave?: () => void;
  }

  // Re-export the motion object with proper typing
  export const motion: {
    [K in keyof React.JSX.IntrinsicElements]: React.ForwardRefExoticComponent<
      React.PropsWithoutRef<HTMLMotionProps<K>> & 
      React.RefAttributes<HTMLElement>
    >;
  };

  // Re-export other necessary types
  export interface MotionProps extends HTMLMotionProps<'div'> {}
  
  // Add type for AnimatePresence
  export const AnimatePresence: React.FC<{
    children?: React.ReactNode;
    initial?: boolean;
    custom?: any;
    onExitComplete?: () => void;
    exitBeforeEnter?: boolean;
    presenceAffectsLayout?: boolean;
  }>;
}
