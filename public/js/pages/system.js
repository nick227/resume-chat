export const system = `
<div class="system">

    <img src="./images/registry.png" title="example">

    <p>
    Each domain has those endpoints crud operations.
    </p>

    <p>
        request -> registry -> controller -> data source -> response
    </p>
    <p>
    At scale, users never touch the real database. Even medium systems should read from a single prepared dataset, not live transactional data. REST servers handle the transaction boundary only. Anything complex goes to a queue — BullMQ, RabbitMQ, Kafka.
    <p>I am interested in OpenAPI and Zod. And I think back-ends should publish a consumable client-sdk.</p>
    <div class="row">
        <div class="col col-30">
            <img src="https://picsum.photos/200" />
        </div>
        <div class="col col-70">
            <p>Infrastructure favors clarity over ceremony.</p>
        </div>
    </div>
</div>
`