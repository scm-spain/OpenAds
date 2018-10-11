import DomainEventBus from '../../../../../openads/domain/service/DomainEventBus'

export default class DomainEventBusWrapper {
  register({eventName, observer}) {
    DomainEventBus.register({eventName, observer})
  }

  raise({domainEvent}) {
    DomainEventBus.raise({domainEvent})
  }
}
