import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchDiscounts, createDiscount, updateDiscount, deleteDiscount } from '../../featuers/discounts-slice/discountsSlice';
import {
  DiscountsHeader,
  DiscountsTable,
  EmptyState,
  CreateDiscountDialog,
  EditDiscountDialog,
  DeleteConfirmationDialog,
} from './components';

const DiscountsPage = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { discounts, loading, error } = useSelector((state) => state.discounts);

  const isRTL = i18n.language === 'ar';

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  // Form state
  const [formData, setFormData] = useState({ 
    symbol: '', 
    name: '', 
    description: '', 
    value: '', 
    discount_type: 'percent' 
  });
  const [formErrors, setFormErrors] = useState({});

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    dispatch(fetchDiscounts());
  }, [dispatch]);

  const handleCreateClick = () => {
    setFormData({ 
      symbol: '', 
      name: '', 
      description: '', 
      value: '', 
      discount_type: 'percent' 
    });
    setFormErrors({});
    setCreateDialogOpen(true);
  };

  const handleEditClick = (discount) => {
    setSelectedDiscount(discount);
    setFormData({ 
      symbol: discount.symbol, 
      name: discount.name, 
      description: discount.description, 
      value: discount.value, 
      discount_type: discount.discount_type 
    });
    setFormErrors({});
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (discount) => {
    setSelectedDiscount(discount);
    setDeleteDialogOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.symbol.trim()) {
      errors.symbol = t('symbolRequired');
    }
    if (!formData.name.trim()) {
      errors.name = t('nameRequired');
    }
    if (!formData.value || formData.value <= 0) {
      errors.value = t('valueRequired');
    }
    if (!formData.discount_type) {
      errors.discount_type = t('discountTypeRequired');
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async () => {
    if (!validateForm()) return;
    const resultAction = await dispatch(createDiscount(formData));
    if (createDiscount.fulfilled.match(resultAction)) {
      setCreateDialogOpen(false);
      setFormData({ 
        symbol: '', 
        name: '', 
        description: '', 
        value: '', 
        discount_type: 'percent' 
      });
    }
  };

  const handleEditSubmit = async () => {
    if (!validateForm()) return;
    const resultAction = await dispatch(updateDiscount({ id: selectedDiscount.id, data: formData }));
    if (updateDiscount.fulfilled.match(resultAction)) {
      setEditDialogOpen(false);
      setSelectedDiscount(null);
      setFormData({ 
        symbol: '', 
        name: '', 
        description: '', 
        value: '', 
        discount_type: 'percent' 
      });
    }
  };

  const handleDeleteConfirm = async () => {
    const resultAction = await dispatch(deleteDiscount(selectedDiscount.id));
    if (deleteDiscount.fulfilled.match(resultAction)) {
      setDeleteDialogOpen(false);
      setSelectedDiscount(null);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getDiscountTypeColor = (type) => {
    return type === 'percent' ? 'primary' : 'secondary';
  };

  const getDiscountTypeLabel = (type) => {
    return type === 'percent' ? t('percentage') : t('fixedAmount');
  };

  const filteredAndSortedDiscounts = discounts
    .filter(discount => {
      const matchesSearch = discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           discount.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           discount.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || discount.discount_type === typeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'symbol': return a.symbol.localeCompare(b.symbol);
        case 'value': return parseFloat(a.value) - parseFloat(b.value);
        case 'type': return a.discount_type.localeCompare(b.discount_type);
        default: return 0;
      }
    });

  const handleClearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
  };

  if (loading && discounts.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, ...(isRTL && { direction: 'rtl', textAlign: 'right' }) }}>
      {/* Header with Title and Filters */}
      <DiscountsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onCreateClick={handleCreateClick}
        isRTL={isRTL}
      />

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Discounts Table or Empty State */}
      {filteredAndSortedDiscounts.length === 0 ? (
        <EmptyState
          searchTerm={searchTerm}
          typeFilter={typeFilter}
          onCreateClick={handleCreateClick}
          onClearFilters={handleClearFilters}
          isRTL={isRTL}
        />
      ) : (
        <DiscountsTable
          discounts={filteredAndSortedDiscounts}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          getDiscountTypeColor={getDiscountTypeColor}
          getDiscountTypeLabel={getDiscountTypeLabel}
        />
      )}

      {/* Dialogs */}
      <CreateDiscountDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        formData={formData}
        formErrors={formErrors}
        loading={loading}
        onInputChange={handleInputChange}
        onSubmit={handleCreateSubmit}
      />

      <EditDiscountDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        formData={formData}
        formErrors={formErrors}
        loading={loading}
        onInputChange={handleInputChange}
        onSubmit={handleEditSubmit}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        selectedDiscount={selectedDiscount}
        loading={loading}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
};

export default DiscountsPage;
