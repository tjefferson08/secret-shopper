# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Secretshopper.Repo.insert!(%Secretshopper.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Secretshopper.User

%User{}
|> User.changeset(%{"email" => "bob@bob.com", "name" => "Bob", "password" => "password"})
|> Secretshopper.Repo.insert!()
