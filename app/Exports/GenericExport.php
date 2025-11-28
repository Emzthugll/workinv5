<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class GenericExport implements FromArray, WithHeadings, WithStyles, WithColumnWidths
{
    protected $data;
    protected $headings;
    protected $columnWidths;
    protected $centerColumns;

    public function __construct(
        array $data,
        array $headings,
        array $columnWidths = [],
        array $centerColumns = []
    ) {
        $this->data = $data;
        $this->headings = $headings;
        $this->columnWidths = $columnWidths;
        $this->centerColumns = $centerColumns;
    }

    public function array(): array
    {
        return $this->data;
    }

    public function headings(): array
    {
        return $this->headings;
    }

    public function styles(Worksheet $sheet)
    {
        $lastRow = count($this->data) + 1;
        $lastColumn = chr(64 + count($this->headings)); // A=65, so 64+1=A

        // Style the header row
        $sheet->getStyle("A1:{$lastColumn}1")->applyFromArray([
            'font' => [
                'bold' => true,
                'color' => ['rgb' => '084896'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
        ]);

        // Style all data rows
        $sheet->getStyle("A2:{$lastColumn}{$lastRow}")->applyFromArray([
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_LEFT,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true,
            ],
        ]);

        // Center align specific columns
        foreach ($this->centerColumns as $column) {
            $sheet->getStyle("{$column}2:{$column}{$lastRow}")->applyFromArray([
                'alignment' => [
                    'horizontal' => Alignment::HORIZONTAL_CENTER,
                    'vertical' => Alignment::VERTICAL_CENTER,
                ],
            ]);
        }

        return [];
    }

    public function columnWidths(): array
    {
        return $this->columnWidths;
    }
}