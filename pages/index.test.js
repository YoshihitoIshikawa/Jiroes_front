import { render } from '@testing-library/react'

import Home from '.'

describe('HomePage', () => {
  let component

  test('should render the home page', () => {
    component = render(<Home />)
    expect(component.container.innerHTML).toContain('ラーメン二郎の心得')
  })
})
