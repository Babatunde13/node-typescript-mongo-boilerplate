import sinon, { SinonFakeTimers, SinonStub } from 'sinon'

const allStubs = new Set<SinonStub | SinonFakeTimers>()

class Stub {
    stubObject?: SinonStub
    create(object: any, methodOrProperty: string, fnOrValue: any) {
        if (typeof fnOrValue === 'function') {
            this.stubObject = sinon.stub(object, methodOrProperty).callsFake(fnOrValue)
        } else {
            this.stubObject = sinon.stub(object, methodOrProperty).value(fnOrValue)
        }

        allStubs.add(this.stubObject)
    }

    restore() {
        if (this.stubObject) {
            this.stubObject.restore()
            allStubs.delete(this.stubObject)
        }
    }
}

export const  createStub = (object: any, methodOrProperty: string, fnOrValue: any) => {
    const stub = new Stub()
    stub.create(object, methodOrProperty, fnOrValue)
    return stub
}

export const restoreAllStubs = () => {
    allStubs.forEach(stub => stub.restore())
}
