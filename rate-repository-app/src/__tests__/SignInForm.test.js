import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import SignIn from '../components/SignIn';

describe('SignIn Form', () => {
  it('call signIn function when press submit', async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(<SignIn onSubmit={onSubmit} />);

    fireEvent.changeText(getByPlaceholderText('Username'), 'minhnd01');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');

    await waitFor(() => {
      fireEvent.press(getByText('Sign in'));

      // console.log(onSubmit.mock.calls);

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'minhnd01',
        password: 'password',
      });
    });
  });
});