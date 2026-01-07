import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Input } from '../ui/input';

const resources = [
  {
    title: 'Community Gardening Guide',
    description: 'A comprehensive guide to starting a community garden.',
    category: 'Gardening',
  },
  {
    title: 'Conflict Resolution Workbook',
    description: 'A workbook for resolving conflicts peacefully.',
    category: 'Conflict Resolution',
  },
  {
    title: 'Cooperative Bylaws Template',
    description: 'A template for creating cooperative bylaws.',
    category: 'Legal',
  },
];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Bolt: Memoize filtered resources to prevent unnecessary recalculations
  const filteredResources = useMemo(() => {
    return resources.filter(resource =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Resource Library</h1>
      <Input
        type="text"
        placeholder="Search for resources..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>{resource.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{resource.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Resources;
