import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Running tests', () => {
  test('should add a row with correct roll number and marks in order of insertion', () => {
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

  test('should be able to edit existing entry in the table', () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '101' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '85' },
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

  test('the number of entries in the table should be same after adding and updating', () => {
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
