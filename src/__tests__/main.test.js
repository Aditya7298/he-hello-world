import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Running tests', () => {
  test('1', () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '101' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '85' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '34' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '90' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    const rows = screen.getAllByRole('row');
    expect(rows[1].textContent).toBe('10185');
    expect(rows[2].textContent).toBe('3490');
  });

  test('2', () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '101' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '85' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '35' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    let rows = screen.getAllByRole('row');
    expect(rows[1].textContent).toBe('10185');

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '101' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '90' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    rows = screen.getAllByRole('row');
    expect(rows[1].textContent).toBe('10190');
  });

  test('3', () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '101' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '85' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '34' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '90' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '35' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '99' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '34' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '100' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(4);
  });
});
