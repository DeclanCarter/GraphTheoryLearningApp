
function EventManagerMixin() {
    this.eventHandlers = {};

    /**
     * 
     */
    this.on = function (eventName, ...handlers) {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }

        this.eventHandlers[eventName].push(...handlers);
    };

    /**
     * 
     */
    this.trigger = function (eventName, ...handlerArguments) {
        if (!this.eventHandlers[eventName]) {
            return;
        }

        this.eventHandlers[eventName].forEach((handler) => {
            handler.apply(this, handlerArguments);
        });
    }
}

module.exports = EventManagerMixin;
