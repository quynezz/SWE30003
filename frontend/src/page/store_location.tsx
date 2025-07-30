import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, MapPin, Phone, Clock, Navigation } from "lucide-react";

export function StoreLocationPage() {
  const stores = [
    {
      id: 1,
      name: "Long Chau District 1",
      address: "123 Nguyen Hue St, District 1, Ho Chi Minh City",
      phone: "(028) 3822 1234",
      hours: "8:00 AM - 10:00 PM",
      services: ["Pharmacy", "Consultation", "Delivery"],
      distance: "1.2 km",
      isOpen: true,
    },
    {
      id: 2,
      name: "Long Chau Binh Thanh",
      address: "456 Xo Viet Nghe Tinh St, Binh Thanh District, Ho Chi Minh City",
      phone: "(028) 3899 5678",
      hours: "7:00 AM - 11:00 PM",
      services: ["Pharmacy", "Health Check", "Vaccination"],
      distance: "2.8 km",
      isOpen: true,
    },
    {
      id: 3,
      name: "Long Chau Thu Duc",
      address: "789 Vo Van Ngan St, Thu Duc City, Ho Chi Minh City",
      phone: "(028) 3123 9876",
      hours: "8:00 AM - 9:00 PM",
      services: ["Pharmacy", "Consultation"],
      distance: "5.1 km",
      isOpen: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Long Chau
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Find Our Stores</h1>
          <p className="text-gray-600 mb-6">
            Locate the nearest Long Chau pharmacy for your convenience
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Enter your location or store name"
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div className="order-2 lg:order-1">
            <Card className="h-96 lg:h-full">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Interactive Map</p>
                    <p className="text-sm text-gray-400">Map integration would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Store List */}
          <div className="order-1 lg:order-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Nearby Stores</h2>
              <Badge variant="secondary">{stores.length} stores found</Badge>
            </div>

            <div className="space-y-4 max-h-96 lg:max-h-full overflow-y-auto">
              {stores.map((store) => (
                <Card key={store.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{store.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            className={store.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                          >
                            {store.isOpen ? "Open" : "Closed"}
                          </Badge>
                          <span className="text-sm text-gray-500">{store.distance} away</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Navigation className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{store.address}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <a
                          href={`tel:${store.phone}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {store.phone}
                        </a>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{store.hours}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {store.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <Button className="flex-1" size="sm">
                        Visit Store
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Call Store
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
