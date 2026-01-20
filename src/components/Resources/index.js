import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { useDebounce } from '../../hooks/use-debounce';

const resources = [
  {
    id: 'gardening-guide',
    title: 'Community Gardening Guide',
    description: 'A comprehensive guide to starting a community garden.',
    category: 'Gardening',
  },
  {
    id: 'conflict-resolution',
    title: 'Conflict Resolution Workbook',
    description: 'A workbook for resolving conflicts peacefully.',
    category: 'Conflict Resolution',
  },
  {
    id: 'bylaws-template',
    title: 'Cooperative Bylaws Template',
    description: 'A template for creating cooperative bylaws.',
    category: 'Legal',
  },
];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Bolt: Debounce search term to prevent filtering on every keystroke
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Bolt: Memoize filtered resources to prevent unnecessary recalculations
  const filteredResources = useMemo(() => {
    return resources.filter(resource =>
      resource.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm]);

  // Bolt: Memoize the list of cards to prevent re-rendering them while typing (during debounce delay)
  const resourceList = useMemo(() => (
    filteredResources.map((resource) => (
      <Card key={resource.id}>
        <CardHeader>
          <CardTitle>{resource.title}</CardTitle>
          <CardDescription>{resource.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{resource.description}</p>
        </CardContent>
      </Card>
    ))
  ), [filteredResources]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Resource Library</h1>
      <Input
        type="text"
        placeholder="Search for resources..."
        aria-label="Search resources"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourceList}
        </div>
      ) : (
        <div className="text-center py-12" role="status">
          <p className="text-lg font-medium text-muted-foreground">No resources found</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default Resources;
