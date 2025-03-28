import { render, screen } from '@testing-library/react'
import { HeroSection } from './HeroSection'

jest.mock('./retro-grid', () => ({
  RetroGrid: () => <div data-testid="retro-grid" />
}))

jest.mock('./decision-demo', () => {
  return function MockDecisionDemo() {
    return <div data-testid="decision-demo">Decision Demo</div>
  }
})

jest.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }: any) => (
      <h1 data-testid="motion-h1" {...props}>{children}</h1>
    ),
  },
  AnimatePresence: ({ children }: any) => <div data-testid="animate-presence">{children}</div>,
}))

describe('HeroSection', () => {
  it('renders hero title correctly', () => {
    render(<HeroSection />)
    
    const headingElement = screen.getByText(/Build and play captivating stories/i)
    expect(headingElement).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<HeroSection />)
    
    const description = screen.getByText(/StoryCrafter is coming/i)
    expect(description).toBeInTheDocument()
  })

  it('includes a call to action button', () => {
    render(<HeroSection />)
    
    const ctaButton = screen.getByRole('link', { name: /Get Early Access/i })
    expect(ctaButton).toBeInTheDocument()
  })

  it('renders the RetroGrid component', () => {
    render(<HeroSection />)
    
    const retroGrid = screen.getByTestId('retro-grid')
    expect(retroGrid).toBeInTheDocument()
  })

  it('renders the DecisionDemo component', () => {
    render(<HeroSection />)
    
    const decisionDemo = screen.getByTestId('decision-demo')
    expect(decisionDemo).toBeInTheDocument()
  })
})