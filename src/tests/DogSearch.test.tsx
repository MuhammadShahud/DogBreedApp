import { render, screen, fireEvent } from '@testing-library/react';
import DogSearch from '../components/DogSearch'; 

describe('DogSearch Component', () => {
  it('renders correctly with an input field and search button', () => {
    render(<DogSearch onSearch={() => {}} />);

    expect(screen.getByPlaceholderText('Search for a breed...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with the correct query when the button is clicked', () => {
    const mockOnSearch = vi.fn(); 
    render(<DogSearch onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a breed...') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Bulldog' } });

    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('bulldog');
  });

  it('does not call onSearch when the input is empty', () => {
    const mockOnSearch = vi.fn();
    render(<DogSearch onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a breed...') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('calls onSearch with trimmed input', () => {
    const mockOnSearch = vi.fn();
    render(<DogSearch onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search for a breed...') as HTMLInputElement;
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  Poodle  ' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('poodle');
  });
});