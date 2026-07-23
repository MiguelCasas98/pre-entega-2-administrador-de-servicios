export class ServiceManager {
  constructor() {
    this.services = [
      {
        id: 1,
        name: "Corte de pelo",
        description: "Servicio básico de peluquería",
        duration: 30,
        price: 1500,
        category: "peluqueria",
        available: true
      }
    ];
  }

  getServices() {
    return this.services;
  }

  getServiceById(id) {
    const service = this.services.find(s => s.id === id);
    return service || null;
  }

  addService(serviceData) {
    const required = ["name", "description", "duration", "price", "category", "available"];

    for (const field of required) {
      if (serviceData[field] === undefined) {
      return null;
      }
    }

    const newId = this.services.length > 0
      ? this.services[this.services.length - 1].id + 1
      : 1;

    const newService = { id: newId, ...serviceData };
    this.services.push(newService);

    return newService;
  }

  updateService(id, updatedData) {
    const index = this.services.findIndex(s => s.id === id);

    if (index === -1) {
      return null;
    }

    const current = this.services[index];

    const updated = {
      ...current,
      ...updatedData,
      id: current.id
    };

    this.services[index] = updated;

    return updated;
  }

  deleteService(id) {
    const index = this.services.findIndex(s => s.id === id);

    if (index === -1) {
      return null;
    }

    const deleted = this.services[index];
    this.services.splice(index, 1);

    return deleted;
  }
}