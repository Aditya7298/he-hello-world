import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Running tests', () => {
  test('should add a row with correct roll number and marks in order of insertion', () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '20' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '3' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '34' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '64' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    const rows = screen.getAllByRole('row');
    expect(rows[1].textContent).toBe('120');
    expect(rows[2].textContent).toBe('334');
    expect(rows[3].textContent).toBe('264');
  });

  test('should be able to edit existing entry in the table', () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '20' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    let rows = screen.getAllByRole('row');
    expect(rows[1].textContent).toBe('120');

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '22' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    rows = screen.getAllByRole('row');
    expect(rows[1].textContent).toBe('122');
  });

  test('the number of entries in the table should be same after adding and updating', () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '20' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '40' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    fireEvent.change(screen.getByPlaceholderText('Enter roll number'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter marks'), {
      target: { value: '34' },
    });
    fireEvent.click(screen.getByText('Add Student'));

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
  });
});
