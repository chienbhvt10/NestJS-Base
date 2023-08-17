## Note

The `@AuthGuard` using strategy to validate authenticate and author

Use connection always use the decorator `@InjectConnection()` to avoid the error of native connection cannot inject connection

Using Enum need use `registerEnumType(Enum, { name: 'Enum Name' })` to register enum with graphql to avoid the output enum type error

Pass argument through graphql api need to define the name and type of the argument by ` @Args('input', { type: () => InputType })`
