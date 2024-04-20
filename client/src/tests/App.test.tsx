import { render, screen } from '@testing-library/react'
import App from '../App'

it("should have Hello World", () => {
  render(<App />)
  const message = screen.queryByText(/Hello World/i)
  expect(message).toBeVisible()
})