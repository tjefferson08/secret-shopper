defmodule Secretshopper.UserFactory do
  defmacro __using__(_opts) do
    quote do
      def user_factory do
        %Secretshopper.User{
          name: "Jane Smith",
          email: sequence(:email, &"email-#{&1}@example.com")
        }
      end
    end
  end
end
