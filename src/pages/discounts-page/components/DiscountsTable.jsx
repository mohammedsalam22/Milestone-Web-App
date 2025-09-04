import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalOffer as DiscountIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const DiscountsTable = ({
  discounts,
  onEditClick,
  onDeleteClick,
  getDiscountTypeColor,
  getDiscountTypeLabel,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const formatValue = (value, type) => {
    if (type === 'percent') {
      return `${value}%`;
    }
    return `${value} ${t('currency')}`;
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
            <TableCell sx={{ fontWeight: 600 }}>{t('discount')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('symbol')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('value')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('type')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('description')}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{t('actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {discounts.map((discount) => (
            <TableRow
              key={discount.id}
              sx={{
                '&:hover': { backgroundColor: theme.palette.action.hover },
                transition: 'background-color 0.2s ease',
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    width: 40,
                    height: 40,
                  }}>
                    <DiscountIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {discount.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: #{discount.id}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={discount.symbol}
                  size="small"
                  color="default"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                  {formatValue(discount.value, discount.discount_type)}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={getDiscountTypeLabel(discount.discount_type)}
                  size="small"
                  color={getDiscountTypeColor(discount.discount_type)}
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />
              </TableCell>
              <TableCell>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    maxWidth: 200,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {discount.description || t('noDescription')}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title={t('edit')}>
                    <IconButton onClick={() => onEditClick(discount)} color="primary" size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('delete')}>
                    <IconButton onClick={() => onDeleteClick(discount)} color="error" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DiscountsTable;
