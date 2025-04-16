import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Test grubunu başlatıyoruz - form validasyonlarını test ediyoruz
describe('Form validation tests', () => {
  
  // Her testten önce uygulama bileşenini render et
  beforeEach(() => {
    render(<App />);
  });

  // Yardımcı fonksiyon: Label'a göre alanı doldurur
  const fillField = (labelText, value) => {
    fireEvent.change(screen.getByLabelText(labelText), { target: { value } });
  };

  // Yardımcı fonksiyon: Submit butonuna tıklar
  const clickSubmit = () => {
    fireEvent.click(screen.getByText('SUBMIT'));
  };

  // TEST 1: Zorunlu alanlar boş bırakıldığında hata mesajları gösterilmeli
  test('shows error messages when required fields are empty', () => {
    clickSubmit();
    expect(screen.getByText('First name is required')).toBeInTheDocument();
    expect(screen.getByText('Last name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.getByText('Please confirm your password')).toBeInTheDocument();
    expect(screen.getByText('Date of birth is required')).toBeInTheDocument();
  });

  // TEST 2: Geçersiz e-posta formatı girildiğinde uyarı vermeli
  test('shows error for invalid email format', () => {
    fillField('First Name', 'John');
    fillField('Last Name', 'Doe');
    fillField('E-mail', 'john@site'); // eksik domain uzantısı
    fillField('Password', 'password123');
    fillField('Confirm Password', 'password123');
    fillField('Date of Birth (dd/mm/yyyy)', '01/01/2000');
    clickSubmit();
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

});
