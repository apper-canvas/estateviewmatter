import { toast } from "react-toastify";

export const propertyService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "sqft_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "amenities_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "parking_c"}},
          {"field": {"Name": "lat_c"}},
          {"field": {"Name": "lng_c"}},
          {"field": {"Name": "listed_date_c"}},
          {"field": {"Name": "status_c"}}
        ],
        orderBy: [{"fieldName": "listed_date_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 50, "offset": 0}
      };

      const response = await apperClient.fetchRecords('property_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      if (!response?.data?.length) {
        return [];
      }

      // Transform database fields to match UI expectations
      const transformedData = response.data.map(item => ({
        Id: item.Id,
        title: item.title_c || '',
        price: item.price_c || 0,
        type: item.type_c || '',
        bedrooms: item.bedrooms_c || 0,
        bathrooms: item.bathrooms_c || 0,
        sqft: item.sqft_c || 0,
        address: item.address_c || '',
        city: item.city_c || '',
        state: item.state_c || '',
        zipCode: item.zip_code_c || '',
        description: item.description_c || '',
        images: item.images_c ? item.images_c.split(',').map(img => img.trim()) : [],
        amenities: item.amenities_c ? item.amenities_c.split(',').map(amenity => amenity.trim()) : [],
        yearBuilt: item.year_built_c || null,
        parking: item.parking_c || '',
        lat: item.lat_c || 0,
        lng: item.lng_c || 0,
        listedDate: item.listed_date_c || new Date().toISOString(),
        status: item.status_c || 'for-sale'
      }));

      return transformedData;
    } catch (error) {
      console.error("Error fetching properties:", error?.response?.data?.message || error);
      toast.error("Failed to load properties. Please try again.");
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "bedrooms_c"}},
          {"field": {"Name": "bathrooms_c"}},
          {"field": {"Name": "sqft_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "city_c"}},
          {"field": {"Name": "state_c"}},
          {"field": {"Name": "zip_code_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "amenities_c"}},
          {"field": {"Name": "year_built_c"}},
          {"field": {"Name": "parking_c"}},
          {"field": {"Name": "lat_c"}},
          {"field": {"Name": "lng_c"}},
          {"field": {"Name": "listed_date_c"}},
          {"field": {"Name": "status_c"}}
        ]
      };

      const response = await apperClient.getRecordById('property_c', id, params);

      if (!response?.data) {
        throw new Error(`Property with Id ${id} not found`);
      }

      // Transform database fields to match UI expectations
      const item = response.data;
      const transformedData = {
        Id: item.Id,
        title: item.title_c || '',
        price: item.price_c || 0,
        type: item.type_c || '',
        bedrooms: item.bedrooms_c || 0,
        bathrooms: item.bathrooms_c || 0,
        sqft: item.sqft_c || 0,
        address: item.address_c || '',
        city: item.city_c || '',
        state: item.state_c || '',
        zipCode: item.zip_code_c || '',
        description: item.description_c || '',
        images: item.images_c ? item.images_c.split(',').map(img => img.trim()) : [],
        amenities: item.amenities_c ? item.amenities_c.split(',').map(amenity => amenity.trim()) : [],
        yearBuilt: item.year_built_c || null,
        parking: item.parking_c || '',
        lat: item.lat_c || 0,
        lng: item.lng_c || 0,
        listedDate: item.listed_date_c || new Date().toISOString(),
        status: item.status_c || 'for-sale'
      };

      return transformedData;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error?.response?.data?.message || error);
      throw new Error(`Property with Id ${id} not found`);
    }
  },

  async create(property) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Transform UI fields to database fields (only updateable fields)
      const params = {
        records: [{
          Name: property.title || '',
          Tags: property.tags || '',
          title_c: property.title || '',
          price_c: property.price || 0,
          type_c: property.type || '',
          bedrooms_c: property.bedrooms || 0,
          bathrooms_c: property.bathrooms || 0,
          sqft_c: property.sqft || 0,
          address_c: property.address || '',
          city_c: property.city || '',
          state_c: property.state || '',
          zip_code_c: property.zipCode || '',
          description_c: property.description || '',
          images_c: Array.isArray(property.images) ? property.images.join(',') : property.images || '',
          amenities_c: Array.isArray(property.amenities) ? property.amenities.join(',') : property.amenities || '',
          year_built_c: property.yearBuilt || null,
          parking_c: property.parking || '',
          lat_c: property.lat || 0,
          lng_c: property.lng || 0,
          listed_date_c: property.listedDate || new Date().toISOString(),
          status_c: property.status || 'for-sale'
        }]
      };

      const response = await apperClient.createRecord('property_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Property created successfully");
          return successful[0].data;
        }
      }
    } catch (error) {
      console.error("Error creating property:", error?.response?.data?.message || error);
      toast.error("Failed to create property. Please try again.");
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Transform UI fields to database fields (only updateable fields)
      const updateData = {
        Id: id
      };

      if (updates.title !== undefined) {
        updateData.Name = updates.title;
        updateData.title_c = updates.title;
      }
      if (updates.tags !== undefined) updateData.Tags = updates.tags;
      if (updates.price !== undefined) updateData.price_c = updates.price;
      if (updates.type !== undefined) updateData.type_c = updates.type;
      if (updates.bedrooms !== undefined) updateData.bedrooms_c = updates.bedrooms;
      if (updates.bathrooms !== undefined) updateData.bathrooms_c = updates.bathrooms;
      if (updates.sqft !== undefined) updateData.sqft_c = updates.sqft;
      if (updates.address !== undefined) updateData.address_c = updates.address;
      if (updates.city !== undefined) updateData.city_c = updates.city;
      if (updates.state !== undefined) updateData.state_c = updates.state;
      if (updates.zipCode !== undefined) updateData.zip_code_c = updates.zipCode;
      if (updates.description !== undefined) updateData.description_c = updates.description;
      if (updates.images !== undefined) {
        updateData.images_c = Array.isArray(updates.images) ? updates.images.join(',') : updates.images;
      }
      if (updates.amenities !== undefined) {
        updateData.amenities_c = Array.isArray(updates.amenities) ? updates.amenities.join(',') : updates.amenities;
      }
      if (updates.yearBuilt !== undefined) updateData.year_built_c = updates.yearBuilt;
      if (updates.parking !== undefined) updateData.parking_c = updates.parking;
      if (updates.lat !== undefined) updateData.lat_c = updates.lat;
      if (updates.lng !== undefined) updateData.lng_c = updates.lng;
      if (updates.listedDate !== undefined) updateData.listed_date_c = updates.listedDate;
      if (updates.status !== undefined) updateData.status_c = updates.status;

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('property_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Property updated successfully");
          return successful[0].data;
        }
      }
    } catch (error) {
      console.error("Error updating property:", error?.response?.data?.message || error);
      toast.error("Failed to update property. Please try again.");
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = { 
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord('property_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Property deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting property:", error?.response?.data?.message || error);
      toast.error("Failed to delete property. Please try again.");
      return false;
    }
  }
};