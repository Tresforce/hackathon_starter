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
- [eventide](http://docs.eventide-project.org/core-concepts/services/components.html)
- [practical microservices](https://learning.oreilly.com/library/view/practical-microservices/9781680507782/f_0034.xhtml)
- [ravendb cqrs](https://ravendb.net/articles/cqrs-and-event-sourcing-made-easy-with-ravendb)
- [martin fowler](https://martinfowler.com/bliki/CQRS.html)
- [sagas](https://microservices.io/patterns/data/saga.html)
- [event sourcing](https://microservices.io/patterns/data/event-sourcing.html)

Api

      We built a couple of these in this chapter. If you’ve done MVC CRUD, then everything you built is properly understood as an Application. They have the HTTP endpoints and are what our end users interact with. The operate in a request/response mode, providing immediate responses to user input.

Components

    Autonomous Components are doers of things. A Component encapsulates a distinct business process. They operate in batch mode, processing batches of messages as they become available.
    Following the language of the Eventide Project,[17] we’ll choose instead the word “Component” to highlight that we’re dealing autonomous units of functionality that model a single business concern.

Aggregators

    Aggregators aggregate state transitions into View Data that Applications use to render what end users see. As with Components, they also operate in batch mode, processing batches of messages as they become available.

View Data

    View Data are read-only models derived from state transitions. They are not authoritative state, but are eventually consistent derivations from authoritative state. As such, we don’t make decisions based on View Data, hence why it’s called View Data. In this book we’ll use PostgreSQL tables for our View Data, but truly, they could be anything from generated static files to Elasticsearch[13] to Neo4j.[14]

Message Store

    At the center of it all is the Message Store. The state transitions we’re using as authoritative state live here. It is at the same time a durable state store as well as a transport mechanism. In this book, we’ll use message-db,[15] an offering from The Eventide Project.[16]

```javascript
{
​ 	  ​"id"​: ​"875b04d0-081b-453e-925c-a25d25213a18"​,
​ 	  ​"type"​: ​"PublishVideo"​,
​ 	  ​"metadata"​: {
​ 	    ​"traceId"​: ​"ddecf8e8-de5d-4989-9cf3-549c303ac939"​,
​ 	    ​"userId"​: ​"bb6a04b0-cb74-4981-b73d-24b844ca334f"​
​ 	  },
​ 	  ​"data"​: {
​ 	    ​"ownerId"​: ​"bb6a04b0-cb74-4981-b73d-24b844ca334f"​,
​ 	    ​"sourceUri"​: ​"https://sourceurl.com/"​,
​ 	    ​"videoId"​: ​"9bfb5f98-36f4-44a2-8251-ab06e0d6d919"​
​ 	  }
​ 	}
```

id

    Every message gets a unique ID, and we use UUIDs for them.

type

    A string and something you choose when you define your messages. When we said earlier that events represent things that have happened, it’s the type that tells us what that thing that happened was. And in the case of commands, the type tells us we want to have happen.

metadata

    An object that contains, well, metadata. The contents of this object have to do with the mechanics of making our messaging infrastructure work. Examples of fields we’ll commonly find in here include traceId, which ties messages resulting from the same user input together. Every incoming user request will get a unique traceId, and any messages written as part of that user request will get written with that request’s traceId. If there are any components that write other messages in response to those messages, then those messages will have the same traceId. In that way, we can easily track everything that happened in the system in response to a particular user request. We’ll put this into action in Chapter 13, ​Debugging Components​, which deals with debugging strategies. We will also commonly have a userId string, representing the ID of the user who caused the message to be written.

data

    A JSON object itself, and the “payload” of the event. The contents of a message’s data field are analogous to the parameters in a function call.

When a command is processed, the output is one or more events

When we start writing messages, we’ll organize them into what we call streams. Streams group messages together logically, usually representing an entity or process in your system. Within a stream, messages are stored in the order they were written.
we call this type of stream an entity stream

We use UUIDs as identifiers in our system, specifically version 4 UUIDs, and so a natural name for one of these user identity streams would be `identity-81cb4647-1296-4f3b-8039-0eedae41c97e`

an entity stream only has a single writer. 

There are other kinds of streams, though. If all goes as planned, Video Tutorials will have more than one user, each with a stream of the form identity-UUID. Every event in such an entity stream is also part of the identity category stream.

To get the category stream that an entity stream belongs to, just take everything to the left of the first dash. So for identity-81cb4647-1296-4f3b-8039-0eedae41c97e, identity is the category. The identity category stream contains every event written to every identity in our system.

We talked about commands, and commands are also written to streams. They aren’t written to entity streams, though—they are written to command streams. In the case of this identity Component, we’ll write to streams of the form `identity:command-81cb4647-1296-4f3b-8039-0eedae41c97e`

Streams, like messages, don’t get deleted. Messages are added to them in an append-only manner.

Now, if there’s anything we can take from the 1984 Ghostbusters film, crossing the streams is Bad™