import { render } from '@testing-library/react'

import Footer from './footer'

describe('Footer Component', () => {
  let component

  test('should render the footer component', () => {
    component = render(<Footer />)
    expect(component.container.innerHTML).toContain('Yoshihito')
  })
})
