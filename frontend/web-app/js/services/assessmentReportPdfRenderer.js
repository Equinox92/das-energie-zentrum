
import {
    createAssessmentReportRenderer
} from "./assessmentReportRenderer.js";

import {
    createAssessmentReportPdfEngineAdapter
} from "./assessmentReportPdfEngineAdapter.js";

// [19.44.3J.1]
// Creates the PDF renderer while preserving the existing
// document contract and architecture-neutral renderer boundary.
export function createAssessmentReportPdfRenderer() {
    const pdfEngine = createAssessmentReportPdfEngineAdapter();

    return createAssessmentReportRenderer(document => {
        const pdf = pdfEngine.generate(document);

        // [19.44.3J.2]
        // Establish page geometry and visual design constants.
        const marginX = 20;
        const marginTop = 20;
        const marginBottom = 22;
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const tableWidth = pageWidth - marginX * 2;
        const labelColumnWidth = 75;
        const valueColumnWidth = tableWidth - labelColumnWidth;
        const lineHeight = 5;
        const tableHeaderHeight = 9;

        // [19.44.3J.3]
        // Defines a restrained, reusable report color palette.
        const colors = {
            heading: [31, 55, 70],
            headerBackground: [226, 237, 241],
            headerText: [31, 55, 70],
            border: [190, 200, 204],
            bodyText: [45, 55, 60],
            mutedText: [105, 115, 120],
            highlightBackground: [239, 246, 239],
            highlightText: [39, 91, 57],
            footer: [120, 130, 135]
        };

        let cursorY = marginTop;

        // [19.44.3J.4]
        // Starts a new page when a block will not fit.
        function ensurePageSpace(requiredHeight) {
            if (cursorY + requiredHeight > pageHeight - marginBottom) {
                pdf.addPage();
                cursorY = marginTop;
            }
        }

        // [19.44.3J.5]
        // Draws a section heading with consistent hierarchy.
        function drawSectionHeading(title, firstBlockHeight = 20) {
            ensurePageSpace(12 + firstBlockHeight);

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(14);
            pdf.setTextColor(...colors.heading);
            pdf.text(title, marginX, cursorY);

            cursorY += 8;

            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(...colors.bodyText);
        }

        // [19.44.3J.6]
        // Draws a shaded table header on the current page.
        function drawTableHeader() {
            pdf.setFillColor(...colors.headerBackground);
            pdf.setDrawColor(...colors.border);
            pdf.setLineWidth(0.2);

            pdf.rect(
                marginX,
                cursorY,
                labelColumnWidth,
                tableHeaderHeight,
                "FD"
            );

            pdf.rect(
                marginX + labelColumnWidth,
                cursorY,
                valueColumnWidth,
                tableHeaderHeight,
                "FD"
            );

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(9);
            pdf.setTextColor(...colors.headerText);

            pdf.text(
                "Property",
                marginX + 3,
                cursorY + 6
            );

            pdf.text(
                "Value",
                marginX + labelColumnWidth + 3,
                cursorY + 6
            );

            cursorY += tableHeaderHeight;

            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(...colors.bodyText);
        }

        // [19.44.3J.7]
        // Draws wrapped table rows and repeats the header
        // whenever a row continues on a new page.
        // Highlighted rows receive subtle emphasis only.
        function drawTable(rows, options = {}) {
            const paddingX = 3;
            const paddingY = 3;
            const minRowHeight = 8;
            const highlightedLabels = options.highlightedLabels ?? [];

            drawTableHeader();

            for (const [label, rawValue] of rows) {
                const value =
                    rawValue === null ||
                    rawValue === undefined ||
                    rawValue === ""
                        ? "Not provided"
                        : String(rawValue);

                pdf.setFontSize(9);

                const labelLines = pdf.splitTextToSize(
                    String(label),
                    labelColumnWidth - paddingX * 2
                );

                const valueLines = pdf.splitTextToSize(
                    value,
                    valueColumnWidth - paddingX * 2
                );

                const lineCount = Math.max(
                    labelLines.length,
                    valueLines.length
                );

                const rowHeight = Math.max(
                    minRowHeight,
                    lineCount * lineHeight + paddingY * 2
                );

                // [19.44.3J.7A]
                // Keeps each row intact and repeats table headings
                // after a page break.
                ensurePageSpace(rowHeight + tableHeaderHeight);

                // If the row triggered a new page, leave space
                // for its repeated header before drawing it.
                if (
                    cursorY === marginTop &&
                    rowHeight > pageHeight - marginTop - marginBottom
                ) {
                    // Oversized individual rows are not expected
                    // in this report's current data contract.
                    throw new Error(
                        "A PDF table row exceeds the available page height."
                    );
                }

                // [19.44.3J.7B]
                // Apply restrained emphasis to selected values.
                const isHighlighted =
                    highlightedLabels.includes(String(label));

                if (isHighlighted) {
                    pdf.setFillColor(...colors.highlightBackground);
                }

                pdf.setDrawColor(...colors.border);
                pdf.setLineWidth(0.2);

                pdf.rect(
                    marginX,
                    cursorY,
                    labelColumnWidth,
                    rowHeight,
                    isHighlighted ? "FD" : "D"
                );

                pdf.rect(
                    marginX + labelColumnWidth,
                    cursorY,
                    valueColumnWidth,
                    rowHeight,
                    isHighlighted ? "FD" : "D"
                );

                pdf.setFont(
                    "helvetica",
                    isHighlighted ? "bold" : "normal"
                );

                pdf.setTextColor(
                    ...(isHighlighted
                        ? colors.highlightText
                        : colors.bodyText)
                );

                pdf.text(
                    labelLines,
                    marginX + paddingX,
                    cursorY + paddingY + lineHeight - 1
                );

                pdf.text(
                    valueLines,
                    marginX + labelColumnWidth + paddingX,
                    cursorY + paddingY + lineHeight - 1
                );

                cursorY += rowHeight;

                pdf.setFont("helvetica", "normal");
                pdf.setTextColor(...colors.bodyText);
            }

            cursorY += 5;
        }

        // [19.44.3J.8]
        // Renders a heading and a consistently wrapped paragraph.
        function drawParagraphHeading(title, text) {
            const paragraphLines = pdf.splitTextToSize(
                String(text ?? "Not provided"),
                tableWidth
            );

            const estimatedHeight =
                8 + paragraphLines.length * lineHeight + 5;

            ensurePageSpace(estimatedHeight);

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(11);
            pdf.setTextColor(...colors.heading);
            pdf.text(title, marginX, cursorY);

            cursorY += 6;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(9);
            pdf.setTextColor(...colors.bodyText);
            pdf.text(paragraphLines, marginX, cursorY);

            cursorY += paragraphLines.length * lineHeight + 5;
        }

        // [19.44.3J.9]
        // Renders the report title with clear visual hierarchy.
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.setTextColor(...colors.heading);
        pdf.text("Das Energie Zentrum", marginX, cursorY);

        cursorY += 9;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        pdf.setTextColor(...colors.bodyText);
        pdf.text("Energy Assessment Report", marginX, cursorY);

        cursorY += 10;

        // [19.44.3J.10]
        // Renders document metadata without changing its values.
        drawTable([
            ["Document Version", document.documentVersion ?? "Not provided"],
            ["Snapshot ID", document.metadata?.snapshotId ?? "Not provided"],
            ["Created At", document.metadata?.createdAt ?? "Not provided"]
        ]);

        // [19.44.3J.11]
        // Locates and renders the existing assessment section.
        const assessmentSection = document.sections?.find(
            section => section.sectionId === "assessment"
        );

        if (assessmentSection) {
            const inputs = assessmentSection.inputs ?? {};
            const metrics = assessmentSection.metrics ?? {};

            drawSectionHeading("Energy Assessment", 65);

            drawTable([
                ["Building Type", inputs.houseType],
                [
                    "House Size",
                    inputs.houseSizeM2 === null ||
                    inputs.houseSizeM2 === undefined
                        ? "Not provided"
                        : `${inputs.houseSizeM2} m²`
                ],
                ["Occupants", inputs.occupants],
                ["Heating Type", inputs.heatingType],
                [
                    "Annual Consumption",
                    inputs.annualConsumptionKwh === null ||
                    inputs.annualConsumptionKwh === undefined
                        ? "Not provided"
                        : `${inputs.annualConsumptionKwh} kWh`
                ],
                ["Year Built", inputs.yearBuilt]
            ]);

            drawSectionHeading("AS-IS Energy Performance", 40);

            drawTable(
                [
                    ["Energy Intensity", metrics.energyIntensity],
                    [
                        "Building Age",
                        metrics.buildingAge === null ||
                        metrics.buildingAge === undefined
                            ? "Not provided"
                            : `${metrics.buildingAge} years`
                    ],
                    [
                        "AS-IS Energy Score",
                        metrics.score === null ||
                        metrics.score === undefined
                            ? "Not provided"
                            : `${metrics.score} / 100`
                    ],
                    ["Classification", metrics.classification]
                ],
                {
                    highlightedLabels: ["AS-IS Energy Score"]
                }
            );
        }

        // [19.44.3J.12]
        // Locates and renders the existing heated-envelope section.
        const heatedEnvelopeSection = document.sections?.find(
            section => section.sectionId === "heated-envelope"
        );

        if (heatedEnvelopeSection) {
            const geometry = heatedEnvelopeSection.geometry ?? {};
            const thermalBoundary = heatedEnvelopeSection.thermalBoundary ?? {};
            const dimensions = heatedEnvelopeSection.dimensions ?? {};

            drawSectionHeading("Heated Envelope", 70);

            drawTable(
                [
                    ["Geometry Type", geometry.name ?? geometry.id],
                    ["Geometry Upper Boundary", geometry.upperBoundary],
                    ["Thermal Boundary", thermalBoundary.upperBoundary],
                    ["Thermal Boundary Source", thermalBoundary.source],
                    [
                        "Length",
                        dimensions.length === null ||
                        dimensions.length === undefined
                            ? "Not provided"
                            : `${dimensions.length} ${dimensions.unit ?? "m"}`
                    ],
                    [
                        "Width",
                        dimensions.width === null ||
                        dimensions.width === undefined
                            ? "Not provided"
                            : `${dimensions.width} ${dimensions.unit ?? "m"}`
                    ],
                    [
                        "Height",
                        dimensions.height === null ||
                        dimensions.height === undefined
                            ? "Not provided"
                            : `${dimensions.height} ${dimensions.unit ?? "m"}`
                    ],
                    [
                        "Estimated Heated Volume",
                        heatedEnvelopeSection.estimatedHeatedVolumeM3 === null ||
                        heatedEnvelopeSection.estimatedHeatedVolumeM3 === undefined
                            ? "Not available"
                            : `${heatedEnvelopeSection.estimatedHeatedVolumeM3} m³`
                    ],
                    [
                        "Estimation Status",
                        heatedEnvelopeSection.estimationStatus ?? "Unresolved"
                    ],
                    [
                        "Professional Calculation Required",
                        heatedEnvelopeSection.professionalCalculationRequired === true
                            ? "Yes"
                            : "No"
                    ]
                ],
                {
                    highlightedLabels: ["Estimated Heated Volume"]
                }
            );

            drawParagraphHeading(
                "Methodology",
                heatedEnvelopeSection.methodology
            );
        }

        // [19.44.3J.13]
        // Keeps the engineering disclaimer distinct and readable.
        drawParagraphHeading(
            "Engineering Disclaimer",
            document.metadata?.estimationDisclaimer ??
                "Engineering estimation disclaimer unavailable."
        );

        // [19.44.3J.14]
        // Adds a restrained footer and page numbering to every page.
        const pageCount = pdf.internal.getNumberOfPages();

        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
            pdf.setPage(pageNumber);

            pdf.setDrawColor(...colors.border);
            pdf.setLineWidth(0.3);

            pdf.line(
                marginX,
                pageHeight - 15,
                pageWidth - marginX,
                pageHeight - 15
            );

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(8);
            pdf.setTextColor(...colors.footer);

            pdf.text(
                "Das Energie Zentrum | Energy Assessment",
                marginX,
                pageHeight - 9
            );

            pdf.text(
                `Page ${pageNumber} of ${pageCount}`,
                pageWidth - marginX,
                pageHeight - 9,
                { align: "right" }
            );
        }

        // [19.44.3J.15]
        // Returns the completed PDF to the existing download flow.
        return pdf;
    });
}