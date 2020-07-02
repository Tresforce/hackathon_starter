# Summary

## Key Terms

- Command
- Query
- Event
- DTO
- Ubiquitous Language
- Handler
- Controller
- Service
- Aggregate
- Saga

## Naming Conventions

Naming convention can either suffix the name with its type or left off if strict conventions are followed.

### Commands

#### Commands are imperative. They tell your application what to do. They can be rejected.

- CreateAccountCommand
- UpdateAccountInformation

### Queries

#### Queries ask your application a question. The are prefixed with `Get`

- GetAllAccountsQuery
- GetOneAccount

### Events

#### Events are things that have happened in the past and are immutable

- AccountCreatedEvent
- AccountDeleted

## Project Structure

## Dependency Resources

- [Spectral](https://meta.stoplight.io/docs/spectral/README.md)
- [tsoa](https://tsoa-community.github.io/docs/introduction.html)
